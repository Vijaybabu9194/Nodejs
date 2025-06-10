const logger = (req, res, next) => {
    console.log(req.method, req.url, new Date().toISOString());
    next()
}

const secretRoute = (req, res, next) => {
    if (req.query.secret === 'mysecret') {
        next()
    } else {
        res.status(401).send('not authorized');
    }
}

module.exports = {
    logger,
    secretRoute
};
