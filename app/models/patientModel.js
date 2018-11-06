const firebase = require('firebase-admin');
const database = firebase.database();

var Patient = function(patientId) {
    this._patientId = patientId;

    this._getPatientRefFromPatientId = function() {
        // genera la referencia general del paciente
        let ref = database.ref('patient/' + this._patientId);
        return ref;
    };

    this._getAll = function(resolve, reject) {
        let ref = database.ref('patient/');
        ref.once("value", function(data) {
            if(data.val()) {
                resolve(data.val());
            }
            else {
                reject();
            }
        });
    }
};


module.exports = Patient;