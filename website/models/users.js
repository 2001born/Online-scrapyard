
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    
    gender:{
        type:String,
        required:true
    },
    phno :{
        type:Number,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
   
    }
})



const Registration = new mongoose.model("Userinfo",userSchema);

module.exports = Registration;
