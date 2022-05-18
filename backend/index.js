const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

//routes
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const authRoute = require('./routes/auth')
const stripeRoute = require('./routes/stripe')

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection is Successful!"))
    .catch(()=>console.log("Error"))


app.use(cors())

//body parser which is now replaced by express is used to parse body of your choice
app.use(express.urlencoded({extended: false}))//parse simple bodies of url encoded data
app.use(express.json());//this is to extract json data and make it readable

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Backend Server is running!")
});