const errorHandler = ((err, req, res, next) => {
    console.error("Something went wrong:", err);
    res.status(500);
    res.json({message: "Server error", error: err.message});
});

const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()} [${req.method}] [${req.url}]`);
    next();
};

const authentication = (req, res, next) => {
    const authStatus = req.headers.authenticated === 'super_secret_word';
    if (authStatus) {
        console.log("user is authorized");
        next();
    } else {
        new Error("user is not authorized")
    }
};

module.exports = {
    errorHandler,
    loggerMiddleware,
    authentication
};
