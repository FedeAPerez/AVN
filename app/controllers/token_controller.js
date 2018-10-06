const tokenService = require('../services/tokenService');

module.exports = {

    get: function(req, res, next) {
        tokenService.getToken()
        .then((res) => {
            res.send({
                "route": "token",
                "operation": "GET",
                "status": 200,
                "valid": res
            });
        })
        .catch((err) => {
            res.send({
                "route": "token",
                "operation": "GET",
                "status": 500,
                "valid": err
            });
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