const HTTP_CODE = {
    OK: 200,
    ERROR: 500,
    NOT_FOUND: 404,
    BAD_REQUEST: 400
};
const HTTP_METHOD = {
    DELETE: "DELETE",
    GET: "GET",
    POST: "POST",
    PUT: "PUST"
};

function _constructHttpResponse(route, method, code, res) {
    const head = {
        "head": {
            "route": route,
            "operation": method,
            "status_code": code,
        }
    };
    return({ head, data : res ? res : null});
}

const HTTP = {
    HTTP_METHOD: HTTP_METHOD,
    HTTP_CODE: HTTP_CODE,
    constructHttpResponse : _constructHttpResponse
};

module.exports = HTTP;