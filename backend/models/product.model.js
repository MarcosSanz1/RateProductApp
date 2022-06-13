const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    rateTotal: {
        type: Number,
        default: 0
    },
    valorations: {
        type: Array
    }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;