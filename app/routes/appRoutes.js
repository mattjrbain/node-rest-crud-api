'use strict';

module.exports = function (app) {
    const categorie = require('../controllers/categorieController');

    app.route('/categories')
        .get(categorie.list_all_categories)
        .post(categorie.create_category);

    app.route('/categories/:id')
        .get(categorie.read_a_category)
        .put(categorie.update_a_category)
        .delete(categorie.delete_a_category);
};