const Product = require("../models/productModel");
const ErorrHandler = require("../utils/errorHandler");
const asyncError = require("../middleWare/catchAsyncerror");
const ApiFeature = require("../utils/apiFeatures");

// create products  only aplicable for --- Admin
exports.createProduct = asyncError(async function (req, res, next) {
  req.body.user = req.user.id;

  let product = await Product.create(req.body);

  if (!product) {
    return next(new ErorrHandler("product not Found", 500));
  }

  res.status(201).json({
    sucess: 1,
    data: product,
  });
});

//get all Product
exports.getAllProduct = asyncError(async function (req, res, next) {
  const apiFeatures = new ApiFeature(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeatures.query;
  console.log("products", products);
  const resultPerPage = 5;
  apiFeatures.pagination(resultPerPage);

  if (!products) {
    return next(new ErorrHandler("product not Found", 500));
  }

  res.status(200).json({
    success: 1,
    data: products,
  });
});

// get Product Details of SingleProduct
exports.getSingleProduct = asyncError(async function (req, res, next) {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErorrHandler("product not Found", 500));
  }

  return res.status(201).json({
    success: true,
    data: product,
  });
});

// update our products --Admin
exports.updateProduct = asyncError(async function (req, res, next) {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErorrHandler("product not found", 500));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: 1,
    data: product,
  });
});

// Delete the Products based On the Id;  --- Admin
exports.deleteProduct = asyncError(async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next("product not Found", 500);
  }

  product = await Product.remove();
  res.status(201).json({
    success: 1,
    data: "product Deleted Succesfully",
  });
});
