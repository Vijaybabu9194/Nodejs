const express = require('express');
const router = require("./routes");
const {logger} = require("./middlewares");

const app = express();;
const PORT = 3000;

app.use(logger);
app.use('/api', router);
// app.use(express.static("./static"));

// https://localhost:3000?search=asdfasdf&product=asdfsadf

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
