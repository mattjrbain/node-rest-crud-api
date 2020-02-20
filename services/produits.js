const cnx = require('../config/connexionBdd.js');

exports.getProduitsByCatId = function (req, res) {
    let categorie_id = req.params.id;

    if (!categorie_id) {
        return res.status(400).send({ error: true, message: 'Please provide categorie_id' });
    }

    cnx.query('SELECT * FROM produits where categorie_id=?', categorie_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'produits by category list.' });
    });
};