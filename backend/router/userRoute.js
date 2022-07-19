'use strict'
const express = require("express");


const {registerUser, loginUser, logoutUser ,resetPassword, getUserDetails, updateUserDetails} = require("../controller/userController")
const {isUserAuthenticated}  = require("../middleWare/auth")


const router = express.Router()


router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/password/forgot").post(resetPassword);
router.route("/me").get( isUserAuthenticated,getUserDetails);
router.route("/password/update").put( isUserAuthenticated,getUserDetails);
router.route("/profile/update").put( isUserAuthenticated,updateUserDetails);


module.exports =router

