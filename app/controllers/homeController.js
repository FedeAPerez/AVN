module.exports = {
    getHome: function(req, res, next) {
        res.send({
            "head": {
                "route": "home",
                "operation": "get",
                "status": 200
            }
        });
        next();
    }
};