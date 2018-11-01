const firebase = require('firebase-admin');
const database = firebase.database();

var Patient = function(patientId) {
    this._patientId = patientId;

    this._getPatientRefFromPatientId = function() {
        // Devuelve la referencia general del token
        let ref = database.ref('patient/' + this._patientId);
        return ref;
    };
};


module.exports = Patient;