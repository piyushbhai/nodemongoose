const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/books');
const userRoutes = require('./routes/users');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/books', bookRouter);
app.use('/user', userRoutes);

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
