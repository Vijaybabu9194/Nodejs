const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

const session = {}

// date with 30 minutes added
Date.prototype.addMinutes = function(minutes) {
    return new Date(this.getTime() + minutes * 60000);
};

const createSessionIfNotExists = (req, res, next) => {
    const sessionId = req.cookies.SESSION_ID;
    if (!sessionId || !session[sessionId]) {
        const newSessionId = crypto.randomBytes(16).toString('hex');
        session[newSessionId] = { createdAt: new Date() };
        res.cookie('SESSION_ID', newSessionId, { httpOnly: true, expires: new Date().addMinutes(30) });
    }
    next();
}

app.use(createSessionIfNotExists);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        status: "success"
    })
})

app.post("/login", async (req, res) => {
    const sessionId = req.cookies.SESSION_ID;
    const {username, password} = req.body
    if (username !== "admin" || password !== "password") {
        return res.json({
            message: "Invalid username or password",
            status: "error"
        })
    }
    session[sessionId].user = { username: "admin" };
    session[sessionId].loggedIn = true;
    res.json({ message: "Login successful", status: "success" });
});

app.get('/me', (req, res) => {
    const sessionId = req.cookies.SESSION_ID;
    if (!sessionId || !session[sessionId] || !session[sessionId].loggedIn) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(session[sessionId].user);
});

app.get('/logout', (req, res) => {
    const sessionId = req.cookies.SESSION_ID;
    if (sessionId && session[sessionId]) {
        session[sessionId].loggedIn = false;
        delete session[sessionId].user;
    }
    res.json({ message: "Logged out successfully" });
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

