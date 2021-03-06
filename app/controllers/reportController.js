const ROUTE ="/report";
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');
const sessionService = require('../services/sessionService');

module.exports = {
    getReportOfPatients: function(req, res, next) {
        sessionService.getReportOfPatients()
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.GET, HTTP_CODE.OK, result));
            next();
        })  
        .catch((err) => {
            res.status(HTTP_CODE.NOT_FOUND).send(httpBuilder.constructHttpResponse(ROUTE, HTTP_METHOD.GET, HTTP_CODE.NOT_FOUND));    
            next();
        });
    }
};