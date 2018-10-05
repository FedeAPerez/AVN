module.exports = {

    get: function(req, res, next) {
        res.send({
            "route":"token",
            "operation":"GET",
            "status_code":200,
            "body": {
                "token": "38662776_05"
            }
        });
        next();
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