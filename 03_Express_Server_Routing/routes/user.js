const {Router} = require('express')

const router = new Router();

router.get('/name', (req, res) => {
    res.send("your name is shaktimaan")
})
router.get('/info', (req, res) => {
    res.send("profile is verified")
})

module.exports = router;
