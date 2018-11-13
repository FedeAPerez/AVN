const firebase = require('firebase-admin');
const database = firebase.database();

var Custom = function() {

    this._createCustom = function(idExercise, idPatient, customObject, resolve, reject) {
        let ref = database.ref('custom/'+idExercise+'/'+idPatient)
        ref.set({
            exercise: {
                intialState: customObject.initialState,
                endingState: customObject.endingState
            }
        }, function(err) {
            if(err) {
                reject(err);
            }
            else {
                resolve(ref.key);
            }
        });
    }

    this._getCustom = function(idExercise, idPatient, resolve, reject) {
        let ref = database.ref('custom/'+idExercise+'/'+idPatient)
        ref.once("value", function(data) {
            if(data.val()) {
                resolve(data.val().exercise);
            }
            else {
                reject();
            }
        });
    }

    this._deleteCustom = function(idExercise, idPatient, resolve, reject) {
        let ref = database.ref('custom/'+idExercise+'/'+idPatient)
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


module.exports = Custom;