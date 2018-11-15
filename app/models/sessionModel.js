const firebase = require('firebase-admin');
const database = firebase.database();

function Session() {

}

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

module.exports = Session;