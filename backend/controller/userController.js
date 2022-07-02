"use strict"
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncerror");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken")

// regiseter a user 
exports.registerUser =catchAsyncErrors (async (req, res , next) =>{
const {name , email , password} = req.body;

const  user = await User.create({
    name,
     email 
     ,password,
    avatar:{
        public_id:"We can Check it",
        url:"my url"
    },
})

const token = user.getJWTToken()

          res.status(200).json({
            success:1,
            message:token
          })
})


// Login user

exports.loginUser = async function ( req ,res, next) {
  

    const {email ,password} = req.body;
    if(!email || !password){
       return  next(new ErrorHander("Please enter eamil and password" , 401)) 

    };

    
    const user = await User.findOne({ email }).select("+password");

    if(!user){
       return next(new ErrorHander("Invalid email and password")) 
    }

    const checkIfPasswordMatch = await  user.comparePassword(password)
    if(!checkIfPasswordMatch){
        return next(new ErrorHander("email and pasword does not Match"))    
    }

    
const token = user.getJWTToken()

          res.status(200).json({
            success:1,
            message:"you have logged in succesfuuly",
            token:token
          })
}



// logout a user 

exports.logoutUser = async function(req , res ,next){
    res.cookies("token" , null ,{
        expire :new Date(Date.now()),
        httpOnly:true   
    })

    res.status(200).json({
        success: true,
        message :"you have been logged out"
    })
}
