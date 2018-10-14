const tokenController = require("../controllers/tokenController");

module.exports = function(app) {
    app.get('/token', tokenController.get);
	app.get('/token/:token', tokenController.getValid);
};