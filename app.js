const express = require('express');
const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const errorMiddleware = require('./middlewares/error')
require('dotenv').config();
require('./startup/db')();
require('./startup/routes')(app, express);
// routes(app);

app.listen(process.env.PORT);