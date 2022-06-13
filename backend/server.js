// DEFINITIONS
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const methodOverride = require("method-override");
const mongoose = require("mongoose")
const routes = require('./routes/product.route');
const http = require("http")
const server = http.createServer(app)

// MONGO CONNECTION DATA
const username = 'marcosSanz'
const password = 'V2Inh1ZsZNL00tZJ'
const cluster = 'cluster0.dukami7'
const dbname = 'RateProducts'
const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`

// DB CONNECTION
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

// EXPRESS CONFIGURATION
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride());

// ROUTES
app.use("/api", routes);

// START SERVER
app.listen(3001, function () {
    console.log("Node server running on http://localhost:3001");
});