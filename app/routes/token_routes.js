const tokenController = require("../controllers/token_controller");

module.exports = function(app) {
    app.get('/token/', tokenController.get);
	app.get('/token/:token', tokenController.getValid);
};