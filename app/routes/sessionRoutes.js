const sessionController = require("../controllers/sessionController");

module.exports = function(app) {
    app.post('/session', sessionController.saveSession);
};