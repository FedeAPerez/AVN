const sessionService = require('../services/sessionService');

module.exports = {

    post: function(req, res, next) {
        sessionService.saveData(req.body.session_data)
        .then((result) => {
            res.send({
                "head": {
                    "route": "session",
                    "operation": "POST",
                    "status": 200
                }
            });
            next();
        })
        .catch((err) => {
            console.error("CAMILA ES ALTA VIRGEN");
            console.log(req);
            res.status(500).send({
                "head": {
                    "route": "session",
                    "operation": "POST",
                    "status": 500
                }
            });
            next();
        });
    },
};