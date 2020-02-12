let express = require('express');
let cors = require('cors');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
                                  extended: true
                              }));


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
                                        host: 'localhost',
                                        user: 'root',
                                        password: '',
                                        database: 'react'
                                    });

// connect to database
dbConn.connect();


// Retrieve all categories
app.get('/categories', function (req, res) {
    dbConn.query('SELECT * FROM categories', function (error, results, fields) {
        // res.set('Access-Control-Allow-Origin', '*');
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categories list.' });
    });
});


// Retrieve categorie with id
app.get('/categorie/:id', function (req, res) {

    let categorie_id = req.params.id;

    if (!categorie_id) {
        return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
    }

    dbConn.query('SELECT * FROM categories where id=?', categorie_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'categories list.' });
    });

});


// Add a new categorie
app.post('/categorie', function (req, res) {

    let categorie = req.body.categorie;
    console.log('pouet');

    if (!categorie) {
        return res.status(400).send({ error:true, message: 'Please provide categorie' });
    }

    dbConn.query("INSERT INTO categories SET libelle = ?", { libelle: categorie.libelle }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New categorie has been created successfully.'});
    });
});


//  Update categorie with id
app.put('/categorie', function (req, res) {

    let categorie_id = req.body.categorie_id;
    let categorie = req.body.categorie;

    if (!categorie_id || !categorie) {
        return res.status(400).send({ error: categorie, message: 'Please provide categorie and categorie_id' });
    }

    dbConn.query("UPDATE categories SET categorie = ? WHERE id = ?", [categorie, categorie_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categorie has been updated successfully.' });
    });
});


//  Delete categorie
app.delete('/categorie', function (req, res) {

    let categorie_id = req.body.categorie.id;

    if (!categorie_id) {
        return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
    }
    dbConn.query('DELETE FROM categories WHERE id = ?', [categorie_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categorie has been updated successfully.' });
    });
});

// set port
app.listen(5000, function () {
    console.log('Node app is running on port 5000');
});

module.exports = app;