const firebase = require('firebase-admin');
const database = firebase.database();

var Exercise = function() {
    this.exerciseId;

    this._getExerciseRefFromExerciseId = function(exerciseId) {
        // genera la referencia general del ejercicio
        this.exerciseId = exerciseId;
        let ref = database.ref('exercise/').child(exerciseId);
        return ref;
    };

    this._createExercise = function(exObject, resolve, reject) {
        let ref = database.ref('exercise/').push();
        ref.set({
            exObject
        }, function(err) {
            if(err) {
                reject(err);
            }
            else {
                resolve(ref.key);
            }
        });
    }

    this._updateExercise = function(exId, exObject, resolve, reject) {
        let ref = database.ref('exercise/'+exId);
        ref.update({
            exObject
        }, function(err) {
            if(err) {
                reject(err);
            }
            else {
                resolve(ref.key);
            }
        });
    }
};


module.exports = Exercise;