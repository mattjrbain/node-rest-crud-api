const express = require("express");
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
const cnx = require('./config/connexionBdd.js');
const categoriesService = require('./services/categories');
const produitsService = require('./services/produits');
const {check, validationResult} = require('express-validator');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Default route

app.get('/', function (req, res) {
    return res.send({error: true, message: 'hello'})
});

// Retrieve all categories
app.get('/categories', categoriesService.getAll);

// Retrieve category with id
app.get('/categories/:id', categoriesService.getOneById);

// Add a new category
app.post('/categories',
    check('libelle', 'Le libelle ne doit contenir que des lettres').isAlpha(),
    check('libelle', 'Mauvaise longueur').isLength({min: 3, max: 10}),
    categoriesService.createCat
)
;

//  Update category with id
app.put('/categories/:id', categoriesService.updateCat);

//  Delete category
app.delete('/categories/:id', categoriesService.delete);


// Produits
// Retrieve produits by category id
app.get('/categories/:id/produits', produitsService.getProduitsByCatId);


// set port
app.listen(5000, function () {
    console.log('Node app is running on port 5000');
});

module.exports = app;