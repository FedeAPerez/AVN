const firebase = require('firebase-admin');
const database = firebase.database();

function Session() {

}

Session.prototype._setInvalidSessionToPatient = function(idToken, idPatient, resolve, reject) {
    let ref = database.ref('session/' + idToken);
    ref.once("value", function(data) {
        if(data.val()) {
            // funcion para agregar a               pacienteNuevoDestino    nuevotoken
            // falta obtener el nuevo token únicamente
            let addRef = database.ref('session/' + idPatient);
            addRef.push();
            let pureData = data.val();
            // sessions
            let arrayOfSessions = Object.keys(data.val());

            let cleanExercises = {};
            arrayOfSessions.forEach(session => {
                cleanExercises[session] = {};
                let exercises = pureData[session];
                exercises.forEach(exercise => {
                    if(exercise) {
                        cleanExercises[session][exercise.Ejercicio] = exercise;
                        console.log(exercise);
                    }
                });
            })
            // agrega
            addRef.set(cleanExercises);
            // borra
            ref.remove();
            resolve();
        }
        else {
            reject();
        }
    });
};

Session.prototype._getAll = function(resolve, reject) {
    let ref = database.ref('session/');
    ref.once("value", function(data) {
        if(data.val()) {
            resolve(data.val());
        }
        else {
            reject();
        }
    });
};

Session.prototype._getAllFilteredByPatient = function(listOfPatients, resolve, reject) {
    let ref = database.ref('session/');
    ref.once("value", function(snapshot) {
        if(snapshot.val()) {
            let listOfFilteredPatients = [];
            let listOfIds = listOfPatients.map(function(obj) {
                return obj.idPatient;
            });
            Object.keys(snapshot.val()).map(k => {
                if(listOfIds.indexOf(k) != -1)
                    listOfFilteredPatients.push({
                        idPatient : k,
                        sessionsInfo : snapshot.val()[k]
                    });
            });
            resolve(listOfFilteredPatients);
        }
        else {
            reject();
        }
    });
};

Session.prototype._getAllWithNoPatient = function(listOfPatients, resolve, reject) {
    let ref = database.ref('session/');
    ref.once("value", function(snapshot) {
        if(snapshot.val()) {
            let listOfFilteredPatients = [];
            let listOfIds = listOfPatients.map(function(obj) {
                return obj.idPatient;
            });
            Object.keys(snapshot.val()).map(k => {
                if(listOfIds.indexOf(k) == -1)
                    listOfFilteredPatients.push({
                        id: k,
                        name : k
                    });
            });
            resolve(listOfFilteredPatients);
        }
        else {
            reject();
        }
    });
};

module.exports = Session;