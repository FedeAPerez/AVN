const express        	= require('express');
const bodyParser     	= require('body-parser');
const cors 				= require('cors');
const router            = require('../app/routes');
const app            	= express();
const authController    = require('../app/controllers/authController');
const metricsController = require('../app/controllers/metricsController');
const IS_AUTH_ENABLED   = process.env.IS_AUTH_ENABLED;

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
  });
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Prevent from favicon in API - NON EXISTANT -
app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
    if (!!IS_AUTH_ENABLED){
        metricsController.createRequest(req, res, next);
    }
    else if(IS_AUTH_ENABLED && authController.isAuthValid(req)) {
        metricsController.createRequest(req, res, next);
    }
    else {
        res.set(403).send("Not authenticated.");
    }
});

// Set de todas las rutas de express con el uso de middleware
router(app);

app.use((req, res, next) => {
    metricsController.finishRequest(req, res, next);
});

module.exports = app;