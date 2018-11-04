const TOKEN_ROUTE ="/token";
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');
const tokenService = require('../services/tokenService');

module.exports = {

    createToken: function(req, res, next) {
        tokenService.createTokenFromPatient(req.body.patientId)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.POST, HTTP_CODE.OK, result));
            next();
        })
        .catch((err) => {
            res.status(HTTP_CODE.BAD_REQUEST).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.POST, HTTP_CODE.ERROR));
            next();
        });
    },

    getValid: function(req, res, next) {
        tokenService.validTokenFromTokenId(req.params.tokenValue)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.GET, HTTP_CODE.OK, result));  
            next();
        })  
        .catch((err) => {
            res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(TOKEN_ROUTE, HTTP_METHOD.GET, HTTP_CODE.ERROR, result));
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