const Exercise = require('../models/exerciseModel');

module.exports = {
    createExercise: function(exerciseData) {
        var createExercisePromise = new Promise(function(resolve, reject) {
            var exercise = new Exercise();
            exercise._createExercise(exerciseData, 
                function(uniqueId){
                    resolve({
                        exerciseId : uniqueId
                    });
                },
                function(err) {
                    reject(err);
                });
        });

        return createExercisePromise;
    }
};