const PATIENT_ROUTE ="/patient";
const patientService = require('../services/patientService');

const HTTP_CODE = {
    OK: 200,
    ERROR: 500,
    NOT_FOUND: 404
};
const HTTP_METHOD = {
    DELETE: "DELETE"
};
function constructHttpResponse(route, method, code, res) {
    const head = {
        "head": {
            "route": route,
            "operation": method,
            "status_code": code,
        }
    };
    return({ head, data : res ? res : null});
}

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
    },
    
    deletePatient: function(req, res, next) {
        patientService.deletePatient(req.params.patientId)
        .then((result) => {
            res.send(constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.DELETE, HTTP_CODE.OK, result));
            next();
        })
        .catch((err) => {
            res.send(constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.DELETE, HTTP_CODE.ERROR));
            next();
        });
    }
};