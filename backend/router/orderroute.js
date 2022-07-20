const express = require("express");
const { newOrder } = require("../controller/orderController");
const {isUserAuthenticated ,authorizeRole} = require("../middleWare/auth");

const router = express.Router()

// order route 

router.route("/order/new").post( isUserAuthenticated,newOrder)


module.exports = router