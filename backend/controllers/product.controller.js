const Product = require("../models/product.model.js");

// GET ALL PRODUCTS
exports.findAllProducts = async (req, res) => {
    Product.find({}).exec().then((products) => {
        res.status(200).json(products);
    }).catch((err) => {
        res.status(500).json(err);
    });
};

// ADD A PRODUCT
exports.addProduct = function (req, res) {
    console.log("POST")
    console.log(req.body)
    
    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        shop: req.body.shop,
        rateTotal: req.body.rateTotal
    });

    Product.create(product).then((product) => {
        res.status(200).json(product)
    }).catch(err => {
        res.status(500).json(err)
        console.log('ERROR backend ', err)
    });
}

// GET A PRODUCT
exports.findById = function (req, res) {
    Product.findById(req.params.id, function(err, product) {
        if(err) {
            res.status(500).json(err)
        } 
        console.log('GET /products/:id' + req.params.id);
        res.status(200).json(product);
    });
}

// DELETE A PRODUCTO
exports.deleteProduct = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
      product.remove(function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send();
      });
    });
}