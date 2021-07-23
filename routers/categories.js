const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.send(categoryList);
});

router.post('/', async (req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });

    category = await category.save();

    if(!category){
        return res.status(500).send('The Category cannot be created!...')
    }

    return res.send(category);
});


router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.param.id).then(category => {
        if(category){
            return res.status(200).json({success: true, msg: 'Catgeory deleted successfully'})
        }else{
            return res.status(404).json({success: false, msg: 'Catgeory not found'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, msg: "Server error"})
    })
});
module.exports =router;