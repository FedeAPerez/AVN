const firebase = require('firebase-admin');
const database = firebase.database();

let Token = function() {
    let _getTokenRefFromPatientId = function(patientId) {
        // Devuelve la referencia general del token
        let ref = database.ref('tokens/' + patientId);
        return ref;
    };
    
    let _getNewTokenRefFromPatientId = function(patientId) {
        // Genera la primer referencia del token
        const beginSessionId = 1;
        const refCreated = database.ref('tokens/' + patientId + '/' + beginSessionId);
        return { refCreated, beginSessionId };
    };

    let _getUpdatedTokenRefFromPatientId = function(data, patientId) {
        // Genera la nueva referencia incrementando de la anterior
        const sessionsCreated = Object.keys(data.val());
        const updatedSessionId = parseInt(sessionsCreated[sessionsCreated.length - 1]) + 1;
        const refUpdated = database.ref('tokens/' + patientId + '/' + updatedSessionId);
        return { refUpdated, updatedSessionId};
    }

    let _createTokenObjectFromRef = function(ref, resolve, reject) {
        ref.set({
            validated : false
        }).then(function(error) {
            if(error) {
                reject();
            }
            else {
                resolve ();
            }
        });
    };

    return {
        getTokenRefFromPatientId : _getTokenRefFromPatientId,
        getNewTokenRefFromPatientId : _getNewTokenRefFromPatientId,
        getUpdatedTokenRefFromPatientId : _getUpdatedTokenRefFromPatientId,
        createTokenObjectFromRef : _createTokenObjectFromRef
    };
}();

module.exports = Token;