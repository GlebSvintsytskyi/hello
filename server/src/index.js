const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const UserController = require('./controllers/userController.js');

const app = express();

const PORT = 9998;

const mongoUrl = "mongodb+srv://gleb:glebbro0451@cluster0.nbwdu0z.mongodb.net/users";

app.use(bodyParser.json());

app.get('/user/:id', UserController.getUser);
app.post('/user/registration', UserController.createUser);
app.delete('/user/:id', UserController.delete);

const start = async () => {
    try {
      await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}!`);
      });
    } catch (error) {
      console.log(error);
    }
}

start();