const patientController = require("../controllers/patientController");

module.exports = function(app) {
	app.get('/patient/:patientId', patientController.getPatient);
	app.get('/patient', patientController.getAllPatients);
	app.put('/patient/:patientId', patientController.updatePatient);
	app.delete('/patient/:patientId', patientController.deletePatient);
};