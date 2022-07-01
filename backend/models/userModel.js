"use strict"
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")
const crypto = require("crypto")
const validator = require("validator")
const { use } = require("../router/userRoute")

const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false, // important thing in lookover for schema design
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      role: {
        type: String,
        default: "user",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
    

})




userSchema.pre('save' , async function  (next){
    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password , 10)
})

// jwtWebToken Method
userSchema.methods.getJWTToken = function () {   
    return jwt.sign({id:this._id} , process.env.JWT_SECRET ,{
    expiresIn:process.env.JWT_EXPIRE,
    })
}




module.exports = mongoose.model("user" , userSchema)