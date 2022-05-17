const mongoose = require('mongoose');

const PrdouctSchema = new mongoose.Schema({
    title: {type:String, required: true, unique: true},
    desc: {type:String, required: true},
    img: {type:String, required: true},
    catergories: {type:Array},
    size: {type:String},
    color: {type:String},
    price: {type:Number, required: true},
    
},
 {timestamps:true}
)

module.exports = mongoose.model("Product", PrdouctSchema);