var admin = require('firebase-admin');
var serviceAccount = require('../private.json');

const Firebase = {
    init: function() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://app-core-6d96d.firebaseio.com"
        });
    }
};

module.exports = Firebase;