const express = require('express')
const User = require('../models/User')
const router = express.Router()
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");

router.put('/:id', verifyTokenAndAuthorization, (req,res)=>{
    
    //if user updating password
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    User.findByIdAndUpdate(req.params.id, {
        $set: req.body //take everything from body and set it again, simple
    }, {new:true})
    .then(updatedUser=>{
        res.status(200).json(updatedUser)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

//DELETE USER

router.delete('/:id', verifyTokenAndAuthorization, (req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser=>{
            res.status(200).json("User has been deleted...")
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

//GET USER

router.get('/find/:id', verifyTokenAndAdmin, (req,res)=>{
    User.findById(req.params.id)
        .then(user=>{

            const {password, ...others} = user._doc;

            res.status(200).json(others)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

//GET ALL USERS

router.get('/', verifyTokenAndAdmin, (req,res)=>{

    const query = req.query.new

    //If new passed in query than get new 5 users
    query ? (User.find()
        .sort({_id: -1})
        .limit(1)
        .then(users=>{

            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    )
    //otherwise all users
    :( User.find()
        .then(users=>{

            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    )
})


//GET USER STATS

router.get('/stats', verifyTokenAndAdmin, (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.getFullYear() - 1)

    User.find()
        User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},

            {
                $project:{
                    month: { $month: "$createdAt"}
                }
            },
            {
                $group :{
                    _id: "$month",
                    total: { $sum:1 }
                }
            }
        ])

        .then(userStats=>{
            res.status(200).json(userStats)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
})

module.exports = router;