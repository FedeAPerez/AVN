// routes/options_routes.js
module.exports = function(app) {
	app.get('/', 
		(req, res) => {
            
            res.setHeader('Content-Type', 'application/json');
            res.send(
                JSON.stringify(
                {
                    "route":"hello",
                    "operation":"GET",
                    "status_code":200
                }, null, 3)
            );

		}
	);

	app.get('/token/', 
		(req, res) => {

            res.send({
                "route":"token",
                "operation":"GET",
                "status_code":200
            });
        }
    );

};