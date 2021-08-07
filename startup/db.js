const mongoose = require('mongoose');


module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/online_cartoons', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('connected to mongodb');
    }).catch((error) => {
        console.log(error);
    });
};