require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || '';
const port = process.env.PORT || 3001;

const signJwt = async (data) => {
    return jwt.sign(data, secret, {algorithm: 'HS512', expiresIn: '1h'})
}

const verifyJwtMiddleware = async (req, res, next) => {
    if (req.path === "/login") {
        return next();
    }
    const token = req.headers.authorization?.replace(/^Bearer\s+/, '');
    if (!token) {
        throw new Error("unauthorized");
    }
    res.user = jwt.verify(token, secret);
    await next();
}

const handleErrorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: err.message,
        status: "error"
    });
}

const app = express();
app.use(express.json());
app.use(verifyJwtMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        status: "success"
    })
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body
    if (username !== "admin" || password !== "password") {
        return res.json({
            message: "Invalid username or password",
            status: "error"
        })
    }
    const token = await signJwt({username, id: 123});
    res.json({message: "Login successful", status: "success", token});
});

app.get('/me', (req, res) => {
    res.json(res.user);
});

app.use(handleErrorMiddleware);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
