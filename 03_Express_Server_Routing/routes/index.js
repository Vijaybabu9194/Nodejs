const {Router} = require('express')

const router = new Router();

router.get('/', (req, res) => {
    res.send("base path")
})
router.get('/a', (req, res) => {
    res.send("a path")
})
router.get('/b', (req, res) => {
    res.send("b path")
})

module.exports = router;
