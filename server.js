const express = require("express");
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
const cnx = require('./config/connexionBdd.js');
const categoriesService = require('./services/categories');

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

// app.get('/categories', function (req, res) {
//     cnx.query('SELECT * FROM categories', function (error, results, fields) {
//         // res.set('Access-Control-Allow-Origin', '*');
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'categories list.' });
//     });
// });


// Retrieve categorie with id
app.get('/categories/:id', function (req, res) {

    let categorie_id = req.params.id;

    if (!categorie_id) {
        return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
    }

    cnx.query('SELECT * FROM categories where id=?', categorie_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'categories list.' });
    });

});


// Add a new categorie


app.post('/categories', function (req, res) {

    let categorie = req.body.categorie;

    if (!categorie) {
        return res.status(400).send({ error:true, message: 'Please provide categorie' });
    }

    cnx.query('INSERT INTO categories SET libelle = ?', categorie.libelle, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New categorie has been created successfully.'});
    });
});


//  Update categorie with id
app.put('/categories/:id', function (req, res) {

    let categorie_id = req.params.id;
    let libelle = req.body.libelle;

    if (!categorie_id || !libelle) {
        return res.status(400).send({ error: libelle, message: 'Please provide categorie and categorie_id' });
    }

    cnx.query("UPDATE categories SET libelle = ? WHERE id = ?", [libelle, categorie_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categorie has been updated successfully.' });
    });
});


//  Delete categorie
app.delete('/categories/:id', function (req, res) {

    let categorie_id = req.params.id;


    if (!categorie_id) {
        return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
    }
    cnx.query('DELETE FROM categories WHERE id = ?', categorie_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categorie has been updated successfully.' });
    });
});



// Produits
// Retrieve produits by categorie id
app.get('/categories/:id/produits', function (req, res) {

    let categorie_id = req.params.id;

    if (!categorie_id) {
        return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
    }

    cnx.query('SELECT * FROM produits where categorie_id=?', categorie_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'produits by category list.' });
    });

});


// set port
app.listen(5000, function () {
    console.log('Node app is running on port 5000');
});

module.exports = app;