require('express-async-errors');
const winston= require('winston');



module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'error.log' }));
    winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({ filename: 'error.log' }))
    // process.on('uncaughtException', ex => {
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });
    process.on('unhandledRejection', ex => {
        winston.error('unhandledRejection:' + ex.message, ex);
        process.exit(1);
    });
}