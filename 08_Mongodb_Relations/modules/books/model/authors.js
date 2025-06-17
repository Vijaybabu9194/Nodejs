const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    age: String
})

module.exports = mongoose.model('authors', schema)
