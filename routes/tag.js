const { isAuth } = require('../middlewares/isAuth');
const { Validator } = require("../middlewares/validator");
const { Tag } = require('../models/tag');
const router = require('express').Router();


router.post('/', [ isAuth, Validator ],  async (req,res) => {
    try {
        let tag = new Tag (req.body)
        tag = await tag.save();
        if(tag) return res.status(201).json({data: tag});
        return res.status(400).json({ message: 'Occured an error'})
    }
    catch (error) {
        return res.status(500).json({ msg: error.message })
  }
});


router.get('/', [ isAuth ], async (req,res) => {
    try {
        const tag = await Tag.find();
        if(tag) return res.status(201).json({data: tag});
        return res.status(400).json({ message: 'Could not find'})
    }
    catch (error) {
        return res.status(500).json({ msg: error.message })
  }
});


router.put('/:id', [ isAuth ], async (req,res) => {
    try {
        console.log("github code");
        const tag = await Tag.updateOne({ _id: req.params.id }, req.body);
        if(tag) return res.status(201).json({data: tag});
        return res.status(400).json({ message: 'Could not update'})
    }
    catch (error) {
        return res.status(500).json({ msg: error.message })
  }
});


router.delete('/:id', [ isAuth ], async (req,res) => {
        const tag = await Tag.deleteOne({ _id: req.params.id}, req.body);
        if(tag) return res.status(201).json({data: tag});
        return res.status(400).json({ message: 'Could not delete'}) 
});




module.exports = router;
