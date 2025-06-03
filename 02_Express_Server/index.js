const http = require("express");

const server = http();

server.get("/", (req, res) => {
    res.send("hello world")
})

server.get("/foo", (req, res) => {
    res.send("foo path")
})

server.get("/bar", (req, res) => {
    res.send("bar path")
})

server.get("/json", (req, res) => {
    res.json({
        "hello": "json"
    })
})

server.listen(5001);
