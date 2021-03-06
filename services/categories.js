const cnx = require('../config/connexionBdd.js');
const {check, validationResult} = require('express-validator');


exports.getAll = function (req, res) {
    cnx.query('SELECT * FROM categories', function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'categories list.'});
    });
};

exports.getOneById = function (req, res) {
    let categorie_id = req.params.id;
    cnx.query('SELECT * FROM categories WHERE id=?', categorie_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results[0], message: 'categories list.'});
    });
};

exports.createCat = function (req, res) {
    let libelle = req.body.libelle;

    // check('libelle').isAlpha()/*.isLength({min: 3, max: 10})*/;
    const errors = validationResult(req);

    if (!libelle) {
        return res.status(400).send({error: true, message: 'Please provide categorie'});
    }

    if (!errors.isEmpty()){
        return res.status(422).json({error: true, errors: errors.array()});
    }

    cnx.query('INSERT INTO categories SET libelle = ?', libelle, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'New categorie has been created successfully.'});
    });
};

exports.updateCat = function (req, res) {
    let categorie_id = req.params.id;
    let libelle = req.body.libelle;

    if (!categorie_id || !libelle) {
        return res.status(400).send({ error: libelle, message: 'Please provide categorie and categorie_id' });
    }

    cnx.query("UPDATE categories SET libelle = ? WHERE id = ?", [libelle, categorie_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categorie has been updated successfully.' });
    });
};

exports.delete = function (req, res) {
    let categorie_id = req.params.id;

    if (!categorie_id) {
        return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
    }
    cnx.query('DELETE FROM categories WHERE id = ?', categorie_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categorie has been updated successfully.' });
    });
};

// exports.getProduits = function (req, res) {
//     let categorie_id = req.params.id;
//
//     if (!categorie_id) {
//         return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
//     }
//
//     cnx.query('SELECT * FROM produits where categorie_id=?', categorie_id, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'produits by category list.' });
//     });
// };