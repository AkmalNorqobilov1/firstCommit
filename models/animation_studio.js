const mongoose = require('mongoose');
const Joi = require('joi')


const animation_studioSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true,
    }
},{
    timestamps: true,
});


const Validator = (animation_studio) => {
    const schema = Joi.object({
        name: Joi.string().required().trim()
    });
    return schema.validate(animation_studio)
};


exports.Animation_Studio = mongoose.model('Animation_Studio', animation_studioSchema);
exports.Validator = Validator;