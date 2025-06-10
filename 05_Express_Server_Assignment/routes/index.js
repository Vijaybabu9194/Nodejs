const {Router} = require('express');
const {secretRoute} = require("../middlewares");

const router = new Router();

router.get('/', [secretRoute, (req, res) => {
    res.send('path /')
}])

router.get('/apc', (req, res) => {
    res.send('path /apc')
})

router.get('/:name', (req, res) => {
    res.send('path /:name')
})


module.exports = router;
