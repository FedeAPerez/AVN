// Nombre de ruta
const TOKEN_ROUTE ="/token";
// HTTP Utils
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');
// Service a consumir
const tokenService = require('../services/tokenService');
const tokenValidator = require('../models/tokenValidator');

module.exports = {

    createToken: function(req, res, next) {
        let validator = tokenValidator.validatedCreate(req);
        if(!validator.error) {
            tokenService.createTokenFromPatient(req.body.patientId, req.body.exerciseId, req.body.repetitions)
            .then((result) => {
                res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.POST, HTTP_CODE.OK, result));
                next();
            })
            .catch((err) => {
                res.status(HTTP_CODE.BAD_REQUEST).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.POST, HTTP_CODE.ERROR));
                next();
            });
        }
        else {
            res.status(HTTP_CODE.BAD_REQUEST).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.POST, HTTP_CODE.BAD_REQUEST, validator));
            next();
        }
    },

    getValid: function(req, res, next) {
        tokenService.validTokenFromTokenId(req.params.tokenValue)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.GET, HTTP_CODE.OK, result));  
            next();
        })  
        .catch((err) => {
            res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.GET, HTTP_CODE.ERROR));
            next();
        });
    },

    getListOfValidTokenByPatient: function(req, res, next) {
        tokenService.validListTokenFromPatientId(req.params.idPatient)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE+'/list', HTTP_METHOD.GET, HTTP_CODE.OK, result));  
            next();
        })  
        .catch((err) => {
            res.status(HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE+'/list', HTTP_METHOD.GET, HTTP_CODE.NOT_FOUND));
            next();
        });
    }
};