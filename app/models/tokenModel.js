const firebase = require('firebase-admin');
const database = firebase.database();

var Token = function(patientId) {
    this._patientId = patientId;
    this._basicReference;
    this._newReference;
    this._newSessionId;

    this._getTokenRefFromPatientId = function() {
        // Devuelve la referencia general del token
        let ref = database.ref('tokens/' + this._patientId);
        return ref;
    };

    this._getTokenSessionRefFromSessionId = function(sessionId) {
        let ref = database.ref('tokens/' + this._patientId + '/' + sessionId);
        return ref;
    }
    
    this._getNewTokenRefFromPatientId = function() {
        // Genera la primer referencia del token
        const beginSessionId = 1;
        this._newReference = database.ref('tokens/' + this._patientId + '/' + beginSessionId);
        this._newSessionId = beginSessionId;
    };

    this._getUpdatedTokenRefFromPatientId = function() {
        // Genera la nueva referencia incrementando de la anterior
        const sessionsCreated = Object.keys(this._referenceData.val());
        const updatedSessionId = parseInt(sessionsCreated[sessionsCreated.length - 1]) + 1;
        this._newReference = database.ref('tokens/' + this._patientId + '/' + updatedSessionId);
        this._newSessionId = updatedSessionId;
    }

    this._selectStrattegyToAddFromData = function(data) {
        if(data.val()) {
           this._referenceData = data;
           this._getUpdatedTokenRefFromPatientId(); 
        }
        else {
            this._getNewTokenRefFromPatientId();
        }
    }

    this._createToken = function(idExercise, repetitions, resolve, reject) {
        this._newReference.set({
            validated: false,
            idExercise: idExercise, 
            repetitions: repetitions
        }).then(function(error) {
            if(error) {
                reject();
            }
            else {
                resolve();
            }
        });
    };

};

module.exports = Token;