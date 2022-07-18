const express = require("express");
const { getAllProduct ,createProduct, 
    updateProduct, deleteProduct, getSingleProduct} = require("../controller/productController");
const {isUserAuthenticated ,authorizeRole} = require("../middleWare/auth");

const router = express.Router()

// getting all Products
router.route("/products").get(getAllProduct);
// adding new Products
router.route("/product/new" ).post( isUserAuthenticated ,authorizeRole('admin'),createProduct);
//update the Product
router.route("/product/:id").put(isUserAuthenticated ,authorizeRole('admin'),updateProduct).delete( isUserAuthenticated ,authorizeRole('admin'),deleteProduct).get(isUserAuthenticated ,authorizeRole('admin'),getSingleProduct)



module.exports = router