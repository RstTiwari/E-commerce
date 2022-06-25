const express = require("express");
const { getAllProduct ,createProduct, updateProduct, deleteProduct, getSingleProduct} = require("../controller/productController");

const router = express.Router()

// getting all Products
router.route("/products").get(getAllProduct);
// adding new Products
router.route("/product/new" ).post(createProduct);
//update the Product
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getSingleProduct)



module.exports = router