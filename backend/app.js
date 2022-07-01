const express  = require("express");
const cors     = require("cors")
const mideleware = require("./middleWare/error")
const app = express();


app.use(cors());
app.use(express.json());



// route import 
const product = require("./router/productRoute");
const user = require("./router/userRoute")

// using the product  end point 
app.use("/api/v1" , product)

//using the user end point
app.use("/api/v1" , user)

// mideleware for error function is beinng defined here;
app.use(mideleware)


module.exports = app;