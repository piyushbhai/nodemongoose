const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    content: String,
    author:String,
});

module.exports = mongoose.model('Blog', bookSchema);
