const swaggerController = require("../controllers/swagger_controller");

module.exports = function(app) {
	app.get('/', swaggerController.hello);
};