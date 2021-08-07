const mongoose = require('mongoose');
const Joi = require('joi');


const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true,
    }
},{
    timestamps: true,
});


const Validator = (tag) => {
    const schema = Joi.object({
        name: Joi.string().required().trim()
    });
    return schema.validate(tag)
};


exports.Tag = mongoose.model('Tag', tagSchema);
exports.Validator = Validator;