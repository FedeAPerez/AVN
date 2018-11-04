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
    },
    updateExercise: function(exerciseId, exerciseData) {
        var updateExercisePromise = new Promise(function(resolve, reject) {
            var exercise = new Exercise();
            exercise._updateExercise(exerciseId, exerciseData, 
                function(exerciseId){
                    resolve({
                        exerciseId: exerciseId
                    });
                },
                function(err) {
                    reject(err);
                });
        });

        return updateExercisePromise;
    },

    deleteExercise: function(idExercise) {
        var deleteExercisePromise = new Promise(function(resolve, reject) {
            var exercise = new Exercise();
            exercise._getExerciseRefFromExerciseId(idExercise).remove(function(error) {
                if(error) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
		return deleteExercisePromise;
    }
};