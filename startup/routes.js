// const express = require('express');
// const app = express();
const errorMiddleware = require('../middlewares/error')

module.exports = function(app, express) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/cartoon', require('../routes/cartoon'));
    app.use('/animation_studio', require('../routes/animation_studio'));
    app.use('/tag', require('../routes/tag'));
    app.use('/user', require('../routes/user'));
    app.use(errorMiddleware);
};