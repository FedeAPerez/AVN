const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
    saveInteraction: function(req, res, timeTaken) {
        if(database) {
            var ref = database.ref('/interaction/' + req.path.split('/')[1] + '/' + Date.now());
            return ref.set({
                reqMethod : req.method,
                reqPath : req.path,
                timeTaken : timeTaken,
                reqBody: req.body || "No body"
            });
        }
    }
};