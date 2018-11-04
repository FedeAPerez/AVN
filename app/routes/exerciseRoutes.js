const exerciseController = require("../controllers/exerciseController");

module.exports = function(app) {
    app.delete('/exercise/:idExercise', exerciseController.deleteExercise);
    app.post('/exercise', exerciseController.createExercise);
    app.put('/exercise/:idExercise', exerciseController.updateExercise);
};