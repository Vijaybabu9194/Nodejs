const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
})

module.exports = mongoose.model('books', schema)
