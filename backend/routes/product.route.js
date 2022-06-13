const express = require("express");

const ProductCtrl = require("../controllers/product.controller")

const ValorationCtrl = require("../controllers/valoration.controller")

// API routes
const routes = express.Router();

routes
  .route("/products")
  .get(ProductCtrl.findAllProducts)
  .post(ProductCtrl.addProduct)
  .delete(ProductCtrl.deleteAll)

routes
  .route("/products/:id")
  .get(ProductCtrl.findById)
  .delete(ProductCtrl.deleteProduct)

// routes
//   .route("/valorations")
//   .get(ValorationCtrl.findAllValorations)
//   .post(ValorationCtrl.addValoration);

routes
  .route("/valorations/:id")
  .get(ValorationCtrl.findAllValorations)
  .post(ValorationCtrl.addValoration);

module.exports = routes