// routes/index.js
const tokenRoutes = require('./token_routes');
const swaggerRoutes = require('./swagger_routes');
const sessionRoutes = require('./sessionRoutes');
module.exports = function(app) {
    tokenRoutes(app);
    swaggerRoutes(app);
    sessionRoutes(app);
};