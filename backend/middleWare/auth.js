"use strict"

const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isUserAuthenticated = catchAsyncErrors(
    async  function (req, res , next) {

  const { token } = req.cookies;
  console.log("token" , token)

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();

}  
) 

module.exports = isUserAuthenticated