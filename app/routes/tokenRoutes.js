const tokenController = require("../controllers/tokenController");

module.exports = function(app) {
    app.post('/token', tokenController.createToken);
	app.get('/token/:tokenValue', tokenController.getValid);
};