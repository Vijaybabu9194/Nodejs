// export all models from this directory
const moviesModel = require('./movies');
const commentsModel = require('./comments');
const theatersModel = require('./theater');

module.exports = {
    moviesModel,
    commentsModel,
    theatersModel
}
