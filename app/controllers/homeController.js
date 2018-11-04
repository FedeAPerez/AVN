const HOME_ROUTE ="/";
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');

module.exports = {
    getHome: function(req, res, next) {
        res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(HOME_ROUTE, HTTP_METHOD.GET, HTTP_CODE.OK));
        next();
    }
};