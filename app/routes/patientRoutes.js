const patientController = require("../controllers/patientController");

module.exports = function(app) {
	app.get('/patient/:patientId', patientController.getPatient);
};