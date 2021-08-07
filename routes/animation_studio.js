const { isAuth } = require('../middlewares/isAuth');
const { Validator } = require("../middlewares/validator");
const { Animation_Studio } = require('../models/animation_studio');
const router = require('express').Router();


router.post('/', [ isAuth, Validator ],  async (req,res) => {
        let animation_studio = new Animation_Studio (req.body)
        animation_studio = await animation_studio.save();
        if(animation_studio) return res.status(201).json({data: animation_studio});
        return res.status(400).json({ message: 'Occured an error'});
});


router.get('/', [ isAuth ], async (req,res) => {
        const animation_studio = await Animation_Studio.find();
        if(animation_studio) return res.status(201).json({data: animation_studio});
        return res.status(400).json({ message: 'Could not find'})
});


router.put('/:id', [ isAuth ], async (req,res) => {
        const animation_studio = await Animation_Studio.updateOne({ _id: req.params.id }, req.body);
        if(animation_studio) return res.status(201).json({data: animation_studio});
        return res.status(400).json({ message: 'Could not update'});
});


router.delete('/:id', [ isAuth ], async (req,res) => {
       const animation_studio = await Animation_Studio.deleteOne({ _id: req.params.id}, req.body);
       if(animation_studio) return res.status(201).json({data: animation_studio});
       return res.status(400).json({ message: 'Could not delete'});
});




module.exports = router;