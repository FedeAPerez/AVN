// routes/index.js
const tokenRoutes = require('./token_routes');

module.exports = function(app) {
    tokenRoutes(app);
};