const Custom = require('../models/customModel');

module.exports = {
    createCustom: function(idExercise, idPatient, customData) {
        var createCustomPromise = new Promise(function(resolve, reject) {
            var customExercise = new Custom();
            customExercise._createCustom(idExercise, idPatient, customData, 
                function(){
                    resolve();
                },
                function(err) {
                    reject(err);
                });
        });

        return createCustomPromise;
    },

    getCustomByPatient: function(idExercise, idPatient) {
        var getCustomPromise = new Promise(function(resolve, reject) {
            var customExercise = new Custom();
            customExercise._getCustom(idExercise, idPatient, 
                function(data){
                    resolve({
                        data
                    });
                },
                function(err) {
                    reject(err);
                });
        });

        return getCustomPromise;
    }
};