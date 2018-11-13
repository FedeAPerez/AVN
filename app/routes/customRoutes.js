const customController = require("../controllers/customController");

module.exports = function(app) {
    app.get('/custom/:idExercise/:idPatient', customController.getCustomByPatient);
    //app.delete('/custom/:idExercise/:idPatient', customController.deleteCustomByPatient);
    app.post('/custom/:idExercise/:idPatient', customController.createCustomForPatient);
    //app.put('/custom/:idExercise/:idPatient', customController.updateExercise);
};