const express = require("express");
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
const cnx = require('./config/connexionBdd.js');
const categoriesService = require('./services/categories');
const produitsService = require('./services/produits');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
                                  extended: true
                              }));


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Retrieve all categories
app.get('/categories', categoriesService.getAll);

// Retrieve categorie with id
app.get('/categories/:id', categoriesService.getOneById);

// Add a new categorie
app.post('/categories', categoriesService.createCat);

//  Update categorie with id
app.put('/categories/:id', categoriesService.updateCat);

//  Delete categorie
app.delete('/categories/:id', categoriesService.delete);


// Produits
// Retrieve produits by categorie id
app.get('/categories/:id/produits', produitsService.getProduitsByCatId);


// set port
app.listen(5000, function () {
    console.log('Node app is running on port 5000');
});

module.exports = app;