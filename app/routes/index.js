// routes/index.js
const tokenRoutes = require('./tokenRoutes');
const sessionRoutes = require('./sessionRoutes');
const patientRoutes = require('./patientRoutes');

module.exports = function(app) {
    tokenRoutes(app);
    sessionRoutes(app);
    patientRoutes(app);
};