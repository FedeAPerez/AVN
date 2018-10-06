const tokenService = require('../services/tokenService');

module.exports = {

    get: function(req, res, next) {
        tokenService.getToken()
        .then((result) => {
            res.send({
                "route": "token",
                "operation": "GET",
                "status": 200,
                "valid": result
            });
            next();
        })
        .catch((err) => {
            res.send({
                "route": "token",
                "operation": "GET",
                "status": 500,
                "valid": err
            });
            next();
        });
    },

    getValid: function(req, res, next) {
        res.send({
            "route":"token",
            "operation":"GET",
            "status_code":200,
            "body": {
                "isValid": true
            }
        });
        next();
    }
};