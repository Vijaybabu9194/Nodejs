const log = (req, res, next) => {
    console.log("->", req.method, req.url, new Date().toISOString())
    next()
    console.log("<-", req.method, req.url, new Date().toISOString())
}

const handleError = (err, req, res, next) => {
    res.status(500)
    res.send("server error");
}

module.exports = {
    log,
    handleError
}
