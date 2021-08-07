const mongoose = require('mongoose');
const Joi = require('joi')


const cartoonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    animation_studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animation_Studio',
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength:30,
    },
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    image: String
},{
    timestamps: true
});


const Validator = (cartoon) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        animation_studio: Joi.string().required(),
        description: Joi.string().required().trim().min(30),
        tag: Joi.array().required()
    });
    return schema.validate(cartoon);
}


exports.Cartoon = mongoose.model('Cartoon', cartoonSchema);
exports.Validator = Validator;