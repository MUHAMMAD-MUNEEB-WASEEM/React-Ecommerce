const express = require('express')
const Order= require('../models/Order')
const router = express.Router()

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");


router.post('/', verifyToken, (req,res)=>{
    const newOrder = new Order(req.body)

    newOrder
        .save()
        .then(Order=>{
            res.status(201).json(Order)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})



router.put('/:id', verifyTokenAndAdmin, (req,res)=>{
    

    Order.findByIdAndUpdate(req.params.id, {
        $set: req.body //take everything from body and set it again, simple
    }, {new:true})
    .then(updatedOrder=>{
        res.status(200).json(updatedOrder)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

// //DELETE Order

router.delete('/:id', verifyTokenAndAdmin, (req,res)=>{
    Order.findByIdAndDelete(req.params.id)
        .then(deletedOrder=>{
            res.status(200).json("User has been deleted...")
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

// //GET USER Order

router.get('/find/:userid', verifyTokenAndAuthorization,(req,res)=>{
    Order.find({userId:req.params.userid})
        .then(Order=>{
            res.status(200).json(Order)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

//GET ALL Orders FOR ADMIN

router.get('/', verifyTokenAndAdmin, (req,res)=>{
    Order
    .find()
    .then(Orders=>{
        res.status(200).json(Orders)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

// GET MONTHLY INCOM

router.get('/income', verifyTokenAndAdmin, (req,res)=>{
    const date = new Date();

    const lastMonth = new Date(date.setMonth(date.getMonth)-1);
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth)-1);

    Order.aggregate([
        {$match: {createdAt: {$gte: previousMonth}}},

        {
            $project:{
                month: { $month: "$createdAt"},
                sales: "$amount",
            }
        },
        {
            $group: {
                _id: "$month",
                total: {$sum: "$sales"}
            }
        }


    ])
    .then(income=>{
        res.status(200).json(income)
    })
    .catch(err=>{
        res.status(500).json(err)
    })

})

module.exports = router;