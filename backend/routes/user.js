const express = require('express')
const router = express.Router()


router.get("/usertest", (req,res) => {
    res.status(200).json({
        type:'Get'
    })
})

router.post('/userposttest', (req, res)=> {
    const username = req.body.username;
    res.status(201).json({
        username: username
    })
})

module.exports = router;