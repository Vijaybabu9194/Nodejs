const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors'
    },
    isbn: String,
})

module.exports = mongoose.model('books', schema)
