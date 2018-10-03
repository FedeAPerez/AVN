// routes/index.js
const tokenRoutes = require('./token_routes');

module.exports = function(app, db_client, db_env) {
    tokenRoutes(app);
};