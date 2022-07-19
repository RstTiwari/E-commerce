const Order = require("../models/orderModel")
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncerror");
const User = require("../models/userModel");


exports.newOrder = catchAsyncErrors(async (req, res, next) =>{
    const {} = req.body
})