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

import updateLastSeen from './middlewares/updateLastSeen.js';
import authMiddleware from './middlewares/authMiddleware.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

const PORT = 9998;

const mongoUrl = "mongodb+srv://gleb:glebbro0451@cluster0.nbwdu0z.mongodb.net/users";

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

app.get('/user/:id', authMiddleware, UserContr.getUser);
app.get('/user', authMiddleware, UserContr.getMe);
app.post('/user/registration', UserContr.createUser);
app.post('/user/login', authMiddleware, UserContr.login);
app.delete('/user/:id', authMiddleware, UserContr.delete);

app.post('/dialogs', authMiddleware, DialogContr.create);
app.get('/dialogs', authMiddleware, DialogContr.getDialogs);
app.delete('/dialogs/:id', authMiddleware, DialogContr.delete);

app.get('/messages', authMiddleware, MessagesContr.getMessages);
app.post('/messages', authMiddleware, MessagesContr.create);
app.delete('/messages/:id', authMiddleware, MessagesContr.delete);

const start = async () => {
    try {
      await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}!`);
      });
    } catch (error) {
      console.log(error);
    }
}

start();
