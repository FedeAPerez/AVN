const PATIENT_ROUTE ="/patient";
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');
const patientService = require('../services/patientService');

module.exports = {
    getPatient: function(req, res, next) {
        patientService.getPatient(req.params.patientId)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.GET, HTTP_CODE.OK, result));
            next();
        })  
        .catch((err) => {
            res.status(HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.GET, HTTP_CODE.NOT_FOUND));    
            next();
        });
    },

    updatePatient: function(req, res, next) {
        patientService.updatePatient(req.params.patientId, req.body)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.PUT, HTTP_CODE.OK, result));
            next();
        })  
        .catch((err) => {
            res.status(HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.PUT, HTTP_CODE.NOT_FOUND));    
            next();
        });
    },
    
    deletePatient: function(req, res, next) {
        patientService.deletePatient(req.params.patientId)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.DELETE, HTTP_CODE.OK, result));
            next();
        })
        .catch((err) => {
            res.status(HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, HTTP_METHOD.DELETE, HTTP_CODE.ERROR));
            next();
        });
    }
};