const tokenService = require('../services/tokenService');

module.exports = {

    createToken: function(req, res, next) {
        tokenService.createTokenFromPatient(req.body.patientId)
        .then((result) => {
            res.send({
                "head": {
                    "route": "token",
                    "operation": "POST",
                    "status": 200
                },
                "data": {
                    "token": result.tokenNumber
                }
            });
            next();
        })
        .catch((err) => {
            res.send({
                "head": {
                    "route": "token",
                    "operation": "POST",
                    "status": 500
                }
            });
            next();
        });
    },

    getValid: function(req, res, next) {
        tokenService.validTokenFromTokenId(req.params.tokenValue)
        .then((result) => {
            res.send({
                "head": {
                    "route": "token",
                    "operation": "GET_VALID",
                    "status_code": 200,
                },
                "data": result
            });  
            next();
        })  
        .catch((err) => {
            res.send({
                "head": {
                    "route": "token",
                    "operation": "GET_VALID",
                    "status_code": 500,
                },
                "data": {
                    "isValid": false
                }
            });
            next();
        });
    },

    getListOfValidTokenByPatient: function(req, res, next) {
        tokenService.validListTokenFromPatientId(req.params.idPatient)
        .then((result) => {
            res.send({
                "head": {
                    "route": "token",
                    "operation": "GET_VALID_LIST",
                    "status_code": 200,
                },
                "data": result
            });  
            next();
        })  
        .catch((err) => {
            res.send({
                "head": {
                    "route": "token",
                    "operation": "GET_VALID_LIST",
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