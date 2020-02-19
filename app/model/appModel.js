'use strict';

const sql = require('../../config/connexionBdd.js');

const Categorie = function (categorie) {
    this.libelle = categorie.libelle;
};
Categorie.createCategory = function (libelle, result) {
    sql.query("INSERT INTO categories set libelle = ?", libelle, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Categorie.getCatById = function (catId, result) {
    sql.query("SELECT * FROM categories WHERE id = ?", catId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Categorie.getAllCategorie = function (result) {
    sql.query("Select * from categories", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('categories : ', res);

            result(null, res);
        }
    });
};
Categorie.updateById = function (id, categorie, result) {
    sql.query("UPDATE categories SET libelle = ? WHERE id = ?", [categorie.libelle, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Categorie.remove = function (id, result) {
    sql.query("DELETE FROM categories WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });

};


module.exports = Categorie;