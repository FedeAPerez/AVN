const homeController = require("../controllers/homeController");

module.exports = function(app) {
    app.get('/', homeController.getHome);
};