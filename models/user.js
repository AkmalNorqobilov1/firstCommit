const mongoose = require('mongoose');
const Joi = require('joi');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlngth: 8,
        maxlength: 1024,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
},{
    timestamps: true
});


const Validator = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().trim().min(2),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(1024),
        role: Joi.string().default(user)
    });
    return schema.validate(user);
};


exports.User = mongoose.model('User', userSchema);
exports.Validator = Validator;