const {Router} = require('express');
const {getBooks, createBook} = require("../controller");

const router = new Router();

router.get('/books', [getBooks])
router.post('/books', [createBook])

module.exports = router;
