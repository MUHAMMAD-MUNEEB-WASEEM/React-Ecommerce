const express = require('express');
const User = require('../models/User');
const router = express.Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//Register

//With Then Catch

router.post('/register', (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })

    newUser
    .save()
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

//With Try Catch (Async Await)

// router.post('/register', async (req,res)=>{
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     })

//     try{
        
//         const savedUser = await newUser.save()
//         res.status(201).json(savedUser)

//     } catch(error){

//         res.status(500).json(error)

//     }
// })


//LOGIN 

router.post('/login', (req,res)=>{

    User.findOne({username: req.body.username})
        .then(user=>{
            if (!user){
                res.status(401).json({
                    message:"Auth Failed"
                })
            }

            const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)

            if (originalPassword !== req.body.password){
                res.status(401).json({
                    message:"Auth Failed"
                })
            }

            const accesToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
            {expiresIn: "3d"}
            );

            const {password, ...others} = user._doc; // {password, {username, email}}

            res.status(201).json({
                ...others, accesToken
            })

        })
        .catch(err=>{
            res.status(500).json(err)
        })

})

//WITH TRY CATCH


module.exports = router;