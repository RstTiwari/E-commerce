const express  = require("express");
const cors     = require("cors")
const mideleware = require("./middleWare/error")
const app = express();


app.use(cors());
app.use(express.json());



// route import 
const product = require("./router/productRoute");

// using the product  end point 
app.use("/api/v1" , product)

// mideleware for error function is beinng defined here;
app.use(mideleware)


module.exports = app;