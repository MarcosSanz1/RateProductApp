const Valoration = require("../models/valoration.model.js");
const Product = require("../models/product.model.js")

let idValoration = '';
let idsValorations = []

// RECOGER TODAS LAS VALORACIONES + RECOGER TODAS LAS VALORACIONES DE UN PRODUCTO
exports.findAllValorations = async (req, res) => {
    // Valoration.find({}).exec().then((Valorations) => {
    //     console.log('RESPONSE FIND ALL VALORATIONS', Valorations);
    //     res.status(200).json(Valorations);
    // }).catch((err) => {
    //     res.status(500).json(err);
    // });
    Product.findById(req.params.id, function(err, product) {
        if(err) {
            res.status(500).json(err)
        } 
        console.log('GET /products/:id' + req.params.id);
        idsValorations = product.valorations

        Valoration.find().where('_id').in(idsValorations).exec().then((valorations) => {
            console.log('RESPONSE FIND ALL VALORATIONS', valorations);
            res.status(200).json(valorations);
        }).catch((err) => {
            res.status(500).json(err);
        });
    });
    
};

// AÑADIR UNA VALORACION Y SE AÑADIRÁ AL PRODUCTO
// Esto recibe el id del producto por params y el contenido de la valoración por body
exports.addValoration = async (req, res) => {
    console.log("POST")
    console.log(req.body)
    
    let valoration = new Valoration({
        user: req.body.user,
        rate: req.body.rate,
        comment: req.body.comment,
    });

    Valoration.create(valoration).then((valoration) => {
        res.status(200).json(valoration)
        console.log("Valoracion", valoration._id)
        idValoration = valoration._id

        Product.findByIdAndUpdate(req.params.id,
            {"$push": {"valorations": idValoration}},
            {"new": true, "upsert": true},
            (err, product) => {
                if (err) console.error("ERROR TO UPDATE ", err);
                console.log("UPDATE PRODUCT ", product);
                console.log("Lista de ids valoraciones", product.valorations)
                idsValorations = product.valorations
            }
        )
    }).catch(err => {
        res.status(500).json(err)
    });
}