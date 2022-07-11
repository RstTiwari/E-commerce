const express = require("express");
const { getAllProduct ,createProduct, 
    updateProduct, deleteProduct, getSingleProduct} = require("../controller/productController");
const {isUserAuthenticated ,authorizeRole} = require("../middleWare/auth");

const router = express.Router()

// getting all Products
router.route("/products").get(isUserAuthenticated ,authorizeRole('admin'), getAllProduct);
// adding new Products
router.route("/product/new" ).post(createProduct);
//update the Product
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getSingleProduct)



module.exports = router