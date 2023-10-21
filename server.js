const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const conn = require('./db/conn');

const bookRouter = require('./controllers/books');
const userRoutes = require('./controllers/users');
const auth = require('./controllers/auth');
const blogPosts = require('./controllers/blogPosts');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads',express.static(__dirname + '/uploads'));


app.use('/book', bookRouter);
app.use('/user', userRoutes);
app.use('/auth', auth);
app.use('/blog', blogPosts);

app.listen(PORT)