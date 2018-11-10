const reportController = require("../controllers/reportController");

module.exports = function(app) {
    app.get('/report', reportController.getReportOfPatients);
};