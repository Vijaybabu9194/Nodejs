const express = require('express');
const routes = require('./routes')
const userRouter = require('./routes/user')
const {handleError} = require("./middlewares");

const app = express();
const PORT = 3000;


app.use('/', routes);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/**
 *
 * /hello -> routes -> [handler, handler, handler]
 *
 */
