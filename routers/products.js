const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');


router.get(`/`, async (req, res) => {
    const products = await Product.find();
    res.send(products);
})

router.post(`/`, (req, res) => {
    const newProducts = req.body;
    
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });

    product.save().then((newProduct => {
        res.status(201).json(newProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    })
})

module.exports = router;
