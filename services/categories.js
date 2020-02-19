const cnx = require('../config/connexionBdd.js');

exports.getAll = function (req, res) {
    cnx.query('SELECT * FROM categories', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'categories list.' });
    });
};