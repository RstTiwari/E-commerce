"use strict"
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleWare/catchAsyncerror");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")

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
 sendToken(user , 201 , res)
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



   sendToken(user , 200, res)
}



// logout a user 

exports.logoutUser = async function(req , res ,next){
    res.cookie("token" , null ,{
        expire :new Date(Date.now()),
        httpOnly:true   
    })

    res.status(200).json({
        success: true,
        message :"you have been logged out"
    })
}

// forgot password emai sending

exports.resetPassword = async function( req, res ,next){
    const user =  await User.findOne({email:req.body.email}) ;

    if(!user){
        new ErrorHander("email_id is not matching with our DataBase");
    }

    const restToken  =  await user.getResetPasswordToken();
    console.log("rsetToken" ,restToken)

    await user.save({validateBeforeSave:false});
    
    const urlToReset =`${req.protocol}://${req.get("host")}/passwrod/reset/ ${restToken}`
    const message = `Your password reset token is :- \n\n ${urlToReset} \n\nIf you have not requested this email then, please ignore it.`;
    console.log("message" , message)

    //Calling the mail Function for further course of action to take
    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce password Requery`,
            message
        })

        res.status(200).json(
            {
                sucess:1,
                message:`Email has been send${user.email} succesfully`
            }
        )

    }catch(error){
           user.resetPasswordToken = undefined;
           user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHander(error.message, 500));

    }

}