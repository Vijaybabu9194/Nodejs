require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(middlewares.logger)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/movies', require('./router'));
app.use(middlewares.errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
