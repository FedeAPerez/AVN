const patientController = require("../controllers/patientController");

module.exports = function(app) {
    app.get('/patient', patientController.getAllPatients);
};