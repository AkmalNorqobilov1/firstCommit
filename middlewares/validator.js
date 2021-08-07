exports.Validator = (req, res, next) => {
    let url = req.baseUrl.slice(1);
    console.log(req.body);
    const { Validator } = require(`../models/${url}`);
    const { error } = Validator(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message)
    }
    next();
};