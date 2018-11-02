// server.js
const express        	= require('express');
const bodyParser     	= require('body-parser');
const cors 				= require('cors')
const app            	= express();
const APIPORT = Number(process.env.PORT);
const IS_AUTH_ENABLED = process.env.IS_AUTH_ENABLED;
var admin = require('firebase-admin');
var serviceAccount = require('./private.json');
const authController = require('./app/controllers/authController');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-core-6d96d.firebaseio.com"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
  

const metricsController = require('./app/controllers/metricsController');

// Prevent from favicon in API - NON EXISTANT -
app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
    if(IS_AUTH_ENABLED && authController.isAuthValid(req)) {
        metricsController.createRequest(req, res, next);
    }
    else {
        res.set(403).send("Not authenticated.");
    }
});

require('./app/routes')(app);

app.use((req, res, next) => {
    metricsController.finishRequest(req, res, next);
});

app.listen((APIPORT), () => {
	console.log('Se está ejecutando en el puerto: ' + APIPORT);
});     
          