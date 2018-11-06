const patientController = require("../controllers/patientController");

module.exports = function(app) {
	app.get('/patient/:patientId', patientController.getPatient);
	app.put('/patient/:patientId', patientController.updatePatient);
	app.delete('/patient/:patientId', patientController.deletePatient);
};