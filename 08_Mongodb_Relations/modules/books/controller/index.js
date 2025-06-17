const {booksModel, authorsModel} = require('../model')

const getBooks = async (req, res) => {
    const books = await booksModel.find().populate("author");
    if (!books.length) {
        return res.json({message: "No books available"});
    }
    res.json(books);
}


const createBook = async (req, res) => {
    const {title, author, isbn} = req.body;

    if (!title || !isbn) {
        const error = new Error("Provide title and isbn");
        error.status = 400;
        throw error;
    }

    if (!author) {
        throw new Error("author is required")
    }

    const authorData = await authorsModel.findOneAndUpdate({name: author.name}, {
        name: author.name,
        age: author.age
    }, {upsert: true, new: true})

    const existing = await booksModel.findOne({isbn});
    if (existing) {
        const error = new Error("ISBN or book already exists");
        error.status = 400;
        throw error;
    }

    const book = new booksModel({title, author: authorData, isbn});
    await book.save();
    res.status(201).json(book);
}

module.exports = {
    createBook,
    getBooks,
}
