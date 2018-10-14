// routes/index.js
const tokenRoutes = require('./tokenRoutes');
const sessionRoutes = require('./sessionRoutes');

module.exports = function(app) {
    tokenRoutes(app);
    sessionRoutes(app);
};