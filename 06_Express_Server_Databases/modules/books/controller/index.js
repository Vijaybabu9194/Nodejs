const bookModel = require('../model')

const getBooks = async (req, res) => {
    const books = await bookModel.find();
    if (!books.length) {
        return res.json({ message: "No books available" });
    }
    res.json(books);
}

const getBooksById = async (req, res) => {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
    }
    res.json(book);
}

const createBook = async (req, res) => {
    const { title, author, isbn } = req.body;

    if (!title || !author || !isbn) {
        const error = new Error("Provide title, author, and isbn");
        error.status = 400;
        throw error;
    }

    const existing = await bookModel.findOne({ isbn });
    if (existing) {
        const error = new Error("ISBN or book already exists");
        error.status = 400;
        throw error;
    }

    const book = new bookModel({ title, author, isbn });
    await book.save();
    res.status(201).json(book);
}

const updateBook = async (req, res) => {
    const { title, author, isbn } = req.body;
    const { id } = req.params;

    const book = await bookModel.findById(id);
    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
    }

    if (isbn) {
        const duplicate = await bookModel.findOne({ isbn: isbn, _id: { $ne: id } });
        if (duplicate) {
            const error = new Error("ISBN or book already exists");
            error.status = 400;
            throw error;
        }
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (isbn) book.isbn = isbn;

    await book.save();
    res.json(book);
}

const deleteBook = async (req, res) => {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        throw error;
    }
    res.json({ message: "Book is deleted", book });
}

module.exports = {
    createBook,
    getBooks,
    getBooksById,
    updateBook,
    deleteBook
}
