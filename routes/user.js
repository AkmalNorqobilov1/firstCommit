const { isAuth } = require("../middlewares/isAuth");
const { Validator } = require("../middlewares/validator");
const { User } = require("../models/user");
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


 router.post('/signup', Validator, async (req,res) => {
        let { password } = req.body;
        const salt = await bcrypt.genSalt(17);
        password = await bcrypt.hash(password, salt);
        let user = new  User ({
            ...req.body,
            password: password
        });
        const savedUser = await user.save();
        if(savedUser) {
            return res.status(200).json({msg: 'registered successfully'})
        }
        return res.status(400).json({msg: 'occured an error'});
 });


 router.post('/signin', async (req,res) => {
        const user = await User.findOne({ email: req.body.email});
        if(user) {
            let isValid = await bcrypt.compare(req.body.password, user.password);
            if(isValid) {
               const token = await jwt.sign(req.body,process.env.PRIVATE_KEY);
               if(token) {
                   return res.status(200).json({token})
               }
               return res.status(400).json({ msg: 'email or password is not valid'});
           }
       }
       return res.status(400).json({ msg: 'email or password is not valid'});
 });


module.exports = router;
