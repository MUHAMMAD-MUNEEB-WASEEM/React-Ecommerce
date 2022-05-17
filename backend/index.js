const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection is Successful!"))
    .catch(()=>console.log("Error"))


//body parser which is now replaced by express is used to parse body of your choice
app.use(express.urlencoded({extended: false}))//parse simple bodies of url encoded data
app.use(express.json());//this is to extract json data and make it readable

//Insurance to prevent cors error
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next(); 
})

app.use('/api/users', userRoute);

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Backend Server is running!")
});