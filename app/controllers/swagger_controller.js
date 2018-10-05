module.exports = {
    hello : function(req, res, next) {  
        res.setHeader('Content-Type', 'application/json');
        res.send(
            JSON.stringify(
            {
                "route":"hello",
                "operation":"GET",
                "status_code":200
            }, null, 3)
        );
        next();
    }
};