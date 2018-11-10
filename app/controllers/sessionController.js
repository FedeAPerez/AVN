const SESSION_ROUTE ="/session";
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');
const sessionService = require('../services/sessionService');

module.exports = {

    saveSession: function(req, res, next) {
        sessionService.saveData(req.body)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(SESSION_ROUTE, HTTP_METHOD.POST, HTTP_CODE.OK));
            next();
        })
        .catch((err) => {
            res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(SESSION_ROUTE, HTTP_METHOD.POST, HTTP_CODE.ERROR));
            next();
        });
    }
};