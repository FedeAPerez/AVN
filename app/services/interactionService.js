const firebase = require('firebase-admin');
const database = firebase.database();
const moment = require('moment');

module.exports = {
    saveInteraction: function(req, res, timeTaken) {
        var dateTime = new Date();
        var dateTimeToString = moment(dateTime).format();
        if(database) {
            var ref = database.ref('/interaction/' + req.path.split('/')[1] + '/' + dateTimeToString);
            return ref.set({
                reqMethod : req.method,
                reqPath : req.path,
                timeTaken : timeTaken,
                reqBody: req.body || "No body"
            });
        }
    }
};