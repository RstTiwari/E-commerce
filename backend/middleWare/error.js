"use strict"
const ErrorHandler  = require("../utils/errorHandler")

module.exports = ( error, req, res ,next) =>{
    error.statusCode = error.statusCode || 500 ,
    error.message     = error.message || "Internal Server Error"



    
  // Wrong Mongodb Id error
  if (error.name === "CastError") {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }
  
    
    
 

    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
};

