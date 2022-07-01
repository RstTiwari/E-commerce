"use strict"
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncerror");
const User = require("../models/userModel");
const crypto = require("crypto");

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

          res.status(200).json({
            success:1,
            data : user
          })
})

