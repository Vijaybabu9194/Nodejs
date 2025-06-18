const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number },
    runtime: { type: Number },
    plot: String,
    genres: [String],
    cast: [String],
    poster: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    rated: String,
    awards: {
        wins: Number,
        nominations: Number,
        text: String
    },
    lastupdated: Date,
    type: String,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number
    },
    countries: [String],
    tomatoes: {
        viewer: {
            rating: Number,
            numReviews: Number
        },
        lastUpdated: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('movies', movieSchema);
