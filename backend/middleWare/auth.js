"use strict"

const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isUserAuthenticated   = catchAsyncErrors( async function (req, res , next) {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzA5NTBmOGFmNTBlNjUxMTczYTBjZCIsImlhdCI6MTY1NzY0OTYzMSwiZXhwIjoxNjYwMjQxNjMxfQ.U0tfcSPGf4FNsq1HNmHhaWKAFw6v5cxAUYYQuEYsafE"

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();

}  )


// making role authorization for this route

exports.authorizeRole =  (...role) =>{
   return (req , res, next) =>{
    if(!role.includes(req.user.role)){
      return  next(
        new ErrorHander(`${req.user.role} is not allowed ,only admin can access`) , 401
      ) 
    }
     next()
   
   }
   

}