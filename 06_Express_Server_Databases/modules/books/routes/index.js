const {Router} = require('express');
const {getBooks, getBooksById, createBook, deleteBook, updateBook} = require("../controller");

const router = new Router();

router.get('/books', [getBooks])
router.get('/books/:id', [getBooksById])
router.post('/books', [createBook])
router.put('/books/:id', [updateBook])
router.delete('/books/:id', [deleteBook])

module.exports = router;
