const admin = require('firebase-admin');
const FILE_ENV = process.env.FILE_ENV.trim();
const PROJ_URL = process.env.PROJ_URL.trim();
const serviceAccount = require('../' + FILE_ENV);

const Firebase = {
    init: function() {
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: PROJ_URL
            });
        }
    }
};

module.exports = Firebase;