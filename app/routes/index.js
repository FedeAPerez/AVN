// routes/index.js
const tokenRoutes = require('./tokenRoutes');
const sessionRoutes = require('./sessionRoutes');
const homeRoutes = require('./homeRoutes');
const patientRoutes = require('./patientRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const reportRoutes = require('./reportRoutes');

module.exports = function(app) {
    tokenRoutes(app);
    sessionRoutes(app);
    homeRoutes(app);
    patientRoutes(app);
    exerciseRoutes(app);
    reportRoutes(app);
};