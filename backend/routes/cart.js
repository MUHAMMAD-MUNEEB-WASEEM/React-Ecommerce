const express = require('express')
const Cart= require('../models/Cart')
const router = express.Router()
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");


router.post('/', verifyToken, (req,res)=>{
    const newCart = new Cart(req.body)

    newCart
        .save()
        .then(Cart=>{
            res.status(201).json(Cart)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})



router.put('/:id', verifyTokenAndAuthorization, (req,res)=>{
    

    Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body //take everything from body and set it again, simple
    }, {new:true})
    .then(updatedCart=>{
        res.status(200).json(updatedCart)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

// //DELETE Cart

router.delete('/:id', verifyTokenAndAuthorization, (req,res)=>{
    Cart.findByIdAndDelete(req.params.id)
        .then(deletedCart=>{
            res.status(200).json("User has been deleted...")
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

// //GET USER Cart

router.get('/find/:userid', verifyTokenAndAuthorization,(req,res)=>{
    Cart.findOne({userId:req.params.userid})
        .then(Cart=>{
            res.status(200).json(Cart)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

//GET ALL CARTS FOR ADMIN

router.get('/', verifyTokenAndAdmin, (req,res)=>{
    Cart
    .find()
    .then(carts=>{
        res.status(200).json(carts)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

module.exports = router;