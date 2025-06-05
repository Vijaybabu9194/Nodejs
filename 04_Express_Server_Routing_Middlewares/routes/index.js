const {Router} = require('express')
const {handlerA, handlerB} = require("../controllers");
const {log, handleError} = require("../middlewares");

const router = new Router();

router.get('/', (req, res) => {
    res.send("base path")
})
router.get('/a', [log, handlerA, handleError])
router.get('/b', [log, handlerB, handleError])

module.exports = router;
