const patientService = require('../services/patientService');

module.exports = {
    getPatient: function(req, res, next) {
        patientService.getPatient(req.params.patientId)
        .then((result) => {
            res.send({
                "head": {
                    "route": "patient",
                    "operation": "GET",
                    "status_code": 200,
                },
                "data": result
            });  
            next();
        })  
        .catch((err) => {
            res.send({
                "head": {
                    "route": "patient",
                    "operation": "GET",
                    "status_code": 500,
                },
                "data": {
                    "notFound": true
                }
            });
            
        next();
        });
    }
};