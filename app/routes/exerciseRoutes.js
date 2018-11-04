const exerciseController = require("../controllers/exerciseController");

module.exports = function(app) {
    app.get('/exercise/difficulty/:idDifficulty', exerciseController.getExerciseByDifficulty);
    app.post('/exercise', exerciseController.createExercise);
};