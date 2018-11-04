const exerciseController = require("../controllers/exerciseController");

module.exports = function(app) {
    app.get('/exercise', exerciseController.getAllExercises);
    app.delete('/exercise/:idExercise', exerciseController.deleteExercise);
    app.post('/exercise', exerciseController.createExercise);
    app.put('/exercise/:idExercise', exerciseController.updateExercise);
};