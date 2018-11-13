// Nombre de ruta
const ROUTE ="/custom";
// HTTP Utils
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');
// Service a consumir
const customService = require('../services/customService');
const customValidator = require('../models/customValidator');

module.exports = {
    createCustomForPatient: function(req, res, next) {
        let validator = customValidator.validatedCreate(req);
        if(!validator.error) {
            customService.createCustom(req.params.idExercise, req.params.idPatient, req.body)
            .then((result) => {
                res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.POST, HTTP_CODE.OK, result));
                next();
            })
            .catch(() => {
                res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.POST, HTTP_CODE.ERROR));
                next();
            });
        }
        else {
            res.status(HTTP_CODE.BAD_REQUEST).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.POST, HTTP_CODE.BAD_REQUEST, validator));
            next();
        }
    },

    getCustomByPatient: function(req, res, next) {
        customService.getCustomByPatient(req.params.idExercise, req.params.idPatient)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.POST, HTTP_CODE.OK, result));
            next();
        })
        .catch(() => {
            res.status(HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.POST, HTTP_CODE.NOT_FOUND));
            next();
        });
    },

    deleteCustomByPatient: function(req, res, next) {
        customService.deleteCustomByPatient(req.params.idExercise, req.params.idPatient)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.POST, HTTP_CODE.OK, result));
            next();
        })
        .catch(() => {
            res.status(HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.POST, HTTP_CODE.NOT_FOUND));
            next();
        });
    }

};