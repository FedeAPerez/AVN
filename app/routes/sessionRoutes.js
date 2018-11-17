const sessionController = require("../controllers/sessionController");

module.exports = function(app) {
    app.post('/session', sessionController.saveSession);
    app.get('/session/status', sessionController.getSessionByStatus);
    app.put('/session/:idToken/:idPatient', sessionController.changeIdSession);
};