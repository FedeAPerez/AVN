const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
    saveIntercation: function(req, res) {
        var ref = database.ref('/interaction/' + req.path + '/' + Date.now());
        return ref.set(req);
    }
};