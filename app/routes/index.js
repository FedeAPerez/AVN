// routes/index.js
const tokenRoutes = require('./tokenRoutes');
const sessionRoutes = require('./sessionRoutes');
const homeRoutes = require('./homeRoutes');

module.exports = function(app) {
    tokenRoutes(app);
    sessionRoutes(app);
    homeRoutes(app);
};