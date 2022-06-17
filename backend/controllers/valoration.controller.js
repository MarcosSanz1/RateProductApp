const Valoration = require("../models/valoration.model.js");
const Product = require("../models/product.model.js")

// let idValoration = '';

let idsValorations = []

// RECOGER TODAS LAS VALORACIONES + RECOGER TODAS LAS VALORACIONES DE UN PRODUCTO
exports.findAllValorations = async (req, res) => {
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

// AQUÍ CADA VEZ QUE AÑADA UNA VALORACIÓN HAGO LA MEDIA Y MODIFICO EL VALOR DE rateTotal
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

    let allRates = []
    await Valoration.create(valoration).then( async (valoration) => {
        res.status(200).json(valoration)
        let valorationObject = valoration
        allRates.push(valoration.rate)
        
       await Product.findById(req.params.id, async (err, product) => {
            if(err) {
                res.status(500).json(err)
            } 
            console.log('Produvto: ', product)
            product.valorations.map( (val) => {
                console.log("VAL RATE",val.rate)
                allRates.push(val.rate)
            });

            let averageRate = allRates.reduce((a, b) => a + b, 0) / allRates.length

            console.log("AVERAGE", averageRate.toFixed(2))
            await Product.findByIdAndUpdate(req.params.id,
                {"$set": {"rateTotal": averageRate.toFixed(0)}, "$push": {"valorations": valorationObject}},
                {"new": true, "upsert": true},
                (err, product) => {
                    if (err) console.error("ERROR TO UPDATE ", err);
                    console.log("UPDATE PRODUCT ", product);
                }
            )
        })
    }).catch(err => {
        res.status(500).json(err)
    });
}