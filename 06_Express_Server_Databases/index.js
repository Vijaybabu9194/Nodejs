require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('database connected'))
    .catch((err) => console.log('error connecting database', err.message))

const booksRouter = require("./modules/books/routes");
const {errorHandler, authentication, loggerMiddleware} = require("./middlewares");
const app = express();
const port = 3001;

//Built-in middleware
app.use(express.json());

app.use(loggerMiddleware);
// app.use(authentication);
app.use('/books', booksRouter)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

