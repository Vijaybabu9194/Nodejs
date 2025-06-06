const axios = require('axios');

const http = axios.create({
    baseURL: "http://localhost:3000"
})

/**
 * 1. GET:    /books
 *    - provide us the list of books
 *    - if no books are there, send a json object with key message "no books found"
 * 2. POST:   /books
 *    - create a book [title, author]
 *    - if title or author is missing, send invalid request error
 *    - [Bonus] title & author exist, return book already in system
 * 3. PUT:    /books/:id
 *    - update book [title, author]
 * 4. DELETE: /books/:id
 *    - delete book if found
 *    - if no book with that id, return [book not found]
 */

/**
 * Middleware:
 * 1. Log [METHOD, PATH, TIME]
 * 2. Handle Error
 */

const validateBookList = () => {
    /**
     * we're expecting server to send us
     * {
     *     "message": "no books found"
     * }
     * @returns {Promise<boolean>}
     */
    const noBookFound = async () => {
        const response = await http.get('/books').catch((err) => ({data: {}}));
        if (response.data.message === "no books found") {
            console.log('[PASS] noBookFound')
        } else {
            console.log('[FAIL] noBookFound')
        }
    }
    /**
     * we're expecting server to send an array
     * @returns {Promise<*>}
     */
    const bookList = async () => {
        const response = await http.get('/books').catch((err) => ({data: null}));
        if (Array.isArray(response.data) && response.data.length) {
            console.log('[PASS] bookList')
        } else {
            console.log('[FAIL] bookList')
        }
    }

    const bookCreate = async () => {
        const book = {
            title: "Lost City",
            author: "Anuj"
        }
        /**
         * return {
         *     id: // counter,
         *     title,
         *     author
         * }
         * @type {Promise<axios.AxiosResponse<any> | {data: null}>}
         */
        const res = await http.post('/books', book).catch((err) => ({data: null}))
        if (!res.data || !res.data.id) {
            console.log('[FAIL] bookCreate')
            return;
        }
        if (res.data.title !== book.title || res.data.author !== book.author) {
            console.log('[FAIL] bookCreate')
            return;
        }
        console.log('[PASS] bookCreate')
        return res.data;
    }

    const deleteBook = async (id) => {
        const response = await http.delete(`/books/${id}`).catch((err) => ({data: {message: null}}))
        if (response.data.message === "deleted") {
            console.log('[PASS] deleteBook')
        } else {
            console.log('[FAIL] deleteBook')
        }
    }

    const updateBook = async (id, title) => {
        const response = await http.put(`/books/${id}`, {title}).catch((err) => ({data: {message: null}}))
        if (response.data.title !== title) {
            console.log('[FAIL] updateBook')
            return;
        }
        console.log('[PASS] updateBook')
    }

    return {
        noBookFound,
        bookList,
        bookCreate,
        deleteBook,
        updateBook
    }
}


(async () => {
    /**
     * 1. create multiple books and validate they exist in the list
     * 2. large testing dataset
     */
    const bookValidator = validateBookList();
    await bookValidator.noBookFound()
    const createdBook = await bookValidator.bookCreate();
    await bookValidator.bookList();
    await bookValidator.updateBook(createdBook.id, "Center of the Earth")
    await bookValidator.deleteBook(createdBook.id);
})()




