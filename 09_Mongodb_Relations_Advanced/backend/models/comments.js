const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies'
    },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comments', commentSchema);
