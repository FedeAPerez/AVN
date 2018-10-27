const tokenService = require('../services/tokenService');

module.exports = {

    createToken: function(req, res, next) {
        tokenService.getToken(req.body.patientId)
        .then((result) => {
            console.log(result);
            
            res.send({
                "head": {
                    "route": "token",
                    "operation": "POST",
                    "status": 200
                },
                "data": {
                    "token": "38662776_05"
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
        res.send({
            "head": {
                "route":"token",
                "operation":"GET_VALID",
                "status_code":200,
            },
            "data": {
                "isValid": true
            }
        });
        next();
    }
};