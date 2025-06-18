const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    theaterId: Number,
    location: {
        address: {
            street1: String,
            city: String,
            state: String,
            zipcode: String
        },
        geo: {
            type: { type: String, default: "Point" },
            coordinates: [Number]
        }
    }
});

// Create a geospatial index on the location field
theaterSchema.index({ "location.geo": "2dsphere" });

module.exports = mongoose.model('theaters', theaterSchema);
