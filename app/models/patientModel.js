const firebase = require('firebase-admin');
const database = firebase.database();

var Patient = function(patientId) {
    this._patientId = patientId;

    this._getPatientRefFromPatientId = function() {
        // genera la referencia general del paciente
        let ref = database.ref('patient/' + this._patientId);
        return ref;
    };
};


module.exports = Patient;