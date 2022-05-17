const express = require('express')
const Product= require('../models/Product')
const router = express.Router()
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");


router.post('/', verifyTokenAndAdmin, (req,res)=>{
    const newProduct = new Product(req.body)

    newProduct
        .save()
        .then(product=>{
            res.status(201).json(product)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})



router.put('/:id', verifyTokenAndAuthorization, (req,res)=>{
    
    //if user updating password

    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body //take everything from body and set it again, simple
    }, {new:true})
    .then(updatedProduct=>{
        res.status(200).json(updatedProduct)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

// //DELETE PRODUCT

router.delete('/:id', verifyTokenAndAdmin, (req,res)=>{
    Product.findByIdAndDelete(req.params.id)
        .then(deletedProduct=>{
            res.status(200).json("User has been deleted...")
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

// //GET PRODUCT

router.get('/find/:id', (req,res)=>{
    Product.findById(req.params.id)
        .then(product=>{
            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

// //GET ALL PRODUCTS

router.get('/', (req,res)=>{

    const queryNew = req.query.new;
    const queryCategory = req.query.category;

    //Get new products, or get products based on category, or get all products

    if(queryNew){
        Product.find()
        .sort({_id: -1})
        .limit(1)
        .then(product=>{

            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    } else if(queryCategory){
        Product.find(
            {
                catergories: {
                  $in: [queryCategory],
                },
        })
        .then(product=>{

            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    } else {
        Product.find()
        .then(product=>{

            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

})

module.exports = router;