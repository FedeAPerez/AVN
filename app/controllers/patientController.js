const PATIENT_ROUTE ="/patient";
const patientService = require('../services/patientService');
const httpBuilder = require('../builder/httpBuilder');

module.exports = {
    getPatient: function(req, res, next) {
        patientService.getPatient(req.params.patientId)
        .then((result) => {
            res.status(httpBuilder.HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, httpBuilder.HTTP_METHOD.GET, httpBuilder.HTTP_CODE.OK, result));
            next();
        })  
        .catch((err) => {
            res.status(httpBuilder.HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, httpBuilder.HTTP_METHOD.GET, httpBuilder.HTTP_CODE.NOT_FOUND));    
            next();
        });
    },
    
    deletePatient: function(req, res, next) {
        patientService.deletePatient(req.params.patientId)
        .then((result) => {
            res.status(httpBuilder.HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, httpBuilder.HTTP_METHOD.DELETE, httpBuilder.HTTP_CODE.OK, result));
            next();
        })
        .catch((err) => {
            res.status(httpBuilder.HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(PATIENT_ROUTE, httpBuilder.HTTP_METHOD.DELETE, httpBuilder.HTTP_CODE.ERROR));
            next();
        });
    }
};