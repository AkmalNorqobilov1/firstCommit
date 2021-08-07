const { isAuth } = require("../middlewares/isAuth");
const { Validator } = require("../middlewares/validator");
const { Cartoon } = require("../models/cartoon");
const { upload } = require("../middlewares/upload")
const router = require('express').Router();
const fs = require('fs');
const path = require('path');



router.post('/', upload.single('image'), async(req, res) => {
    console.log(req.body)
    let cartoon = new Cartoon({
        name: req.body.name,
        animation_studio: req.body.animation_studio,
        description: req.body.description,
        tag: req.body.tag,
        image: req.file.filename
    });
    cartoon = await cartoon.save();
    if (cartoon) return res.status(201).json({ data: cartoon });
    return res.status(400).json({ message: 'Occured an error' });
});


router.get('/', [isAuth], async(req, res) => {
    const cartoon = await Cartoon.find()
        .populate('Animation_Studio', 'name')
        .populate('Tag', 'name')
    if (cartoon) return res.status(201).json({ data: cartoon });
    return res.status(400).json({ message: 'Could not find' });
});


router.put('/:id', [upload.single('image')], async(req, res) => {
    let cartoon = await Cartoon.findOne({ _id: req.params.id });
    if (cartoon.image)
        cartoon = await Cartoon.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            animation_studio: req.body.animation_studio,
            description: req.body.description,
            tag: req.body.tag,
            image: req.file.filename
        });
    if (cartoon) return res.status(201).json({ data: cartoon });
    return res.status(400).json({ message: 'Could not update' });
});


router.delete('/:id', [isAuth, upload.single('image')], async(req, res) => {
    let cartoon = await Cartoon.findOne({ _id: req.params.id });

    if (cartoon.image) {
        await fs.unlink(path.join(__dirname, '/../uploads/' + cartoon.image), (error) => {

            if (error)
                return res.status(400).json(error);
            else
                return res.status(200).json({ msg: 'deleted' })
        });

    };
    cartoon = await Cartoon.deleteOne({ _id: req.params.id }, req.body);
    if (cartoon) return res.status(201).json({ msg: 'deleted' });
    return res.status(400).json({ message: 'Could not delete' })
});


module.exports = router;