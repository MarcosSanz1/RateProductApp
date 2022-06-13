const mongoose = require("mongoose");

// Necesito pasar el id del product.model que genera automáticamente a productId
const ValorationSchema = new mongoose.Schema({
    user: {
        avatar: {
            type: String,
            default: 'https://avatars.githubusercontent.com/u/1561955?v=4'
        },
        name: {
            type: String,
            default: 'sanzmarcos18'
        }
    },
    rate: {
        type: Number,
        default: 0,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comment: {
        type: String
    }
});

const Valoration = mongoose.model("Valoration", ValorationSchema);

module.exports = Valoration;