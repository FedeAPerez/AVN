const firebase = require('firebase-admin');
const database = firebase.database();

var Exercise = function() {
    this.exerciseId;

    this._getAll = function(resolve, reject) {
        let ref = database.ref('exercise/');
        ref.once("value", function(data) {
            if(data.val()) {
                resolve(data.val());
            }
            else {
                reject();
            }
        });
    };

    this._getByExerciseId = function(exerciseId, resolve, reject) {
        let ref = database.ref('exercise/').child(exerciseId);
        ref.once("value", function(data) {
            if(data.val()) {
                resolve(data.val().exercise);
            }
            else {
                reject();
            }
        });
    };

    this._createExercise = function(exObject, resolve, reject) {
        let ref = database.ref('exercise/').push();
        ref.set({
            exercise: exObject
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
            exercise : exObject
        }, function(err) {
            if(err) {
                reject(err);
            }
            else {
                resolve(ref.key);
            }
        });
    }

    this._deleteExercise = function(exId, resolve, reject) {
        let ref = database.ref('exercise/'+exId);
        ref.remove(function(err) {
            if(err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    }
};


module.exports = Exercise;