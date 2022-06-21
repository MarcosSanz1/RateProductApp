const express = require("express");

const ProductCtrl = require("../controllers/product.controller")

const ValorationCtrl = require("../controllers/valoration.controller")

// API routes
const routes = express.Router();

routes
  .route("/products")
  .get(ProductCtrl.findAllProducts)
  .post(ProductCtrl.addProduct)

routes
  .route("/products/:id")
  .get(ProductCtrl.findById)
  .delete(ProductCtrl.deleteProduct)

routes
  .route("/valorations/:id")
  .post(ValorationCtrl.addValoration);

module.exports = routes