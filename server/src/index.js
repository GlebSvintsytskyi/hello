import 'dotenv/config'
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

import { Server } from "socket.io";

app.use(cors());


import UserController from './controllers/userController.js';
import DialogController from './controllers/dialogController.js';
import MessageController from './controllers/messageController.js';
import UploadFileController from './controllers/uploadFileController.js';

import updateLastSeen from './middlewares/updateLastSeen.js';
import authMiddleware from './middlewares/authMiddleware.js';

import uploader from './utils/multer.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

app.use(bodyParser.json());
app.use(updateLastSeen);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('111', 'QWQWOKIW@JF');

  socket.on('222', (msg) => {
    console.log('CLIENT_SAY'+ ' ' + msg);
  });
});

const UserContr = new UserController(io);
const DialogContr = new DialogController(io);
const MessagesContr = new MessageController(io);
const UploadFileCont = new UploadFileController();

app.get('/user/find', authMiddleware, UserContr.findUsers);
app.get('/user/verify', UserContr.verify);
app.get('/user/:id', authMiddleware, UserContr.getUser);
app.post('/user/registration', UserContr.createUser);
app.post('/user/login', authMiddleware, UserContr.login);
app.get('/user', authMiddleware, UserContr.getMe);
app.delete('/user/:id', authMiddleware, UserContr.delete);

app.post('/dialogs', authMiddleware, DialogContr.create);
app.get('/dialogs', authMiddleware, DialogContr.getDialogs);
app.delete('/dialogs/:id', authMiddleware, DialogContr.delete);

app.get('/messages', authMiddleware, MessagesContr.getMessages);
app.post('/messages', authMiddleware, MessagesContr.create);
app.delete('/messages/:id', authMiddleware, MessagesContr.delete);

app.post('/files', uploader.single('files'), authMiddleware, UploadFileCont.index);
// app.delete('/files/:id', authMiddleware, UploadFileCont.delete);

const start = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      server.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}!`);
      });
    } catch (error) {
      console.log(error);
    }
}

start();
