// server.js
const express        	= require('express');
const bodyParser     	= require('body-parser');
const cors 				= require('cors')
const app            	= express();
var port = Number(process.env.PORT);
var admin = require('firebase-admin');
var serviceAccount = require('./private.json');

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
    metricsController.createRequest(req, res, next);
});

require('./app/routes')(app);

app.use((req, res, next) => {
    metricsController.finishRequest(req, res, next);
});

app.listen((port), () => {
	console.log('Se está ejecutando en el puerto: ' + port);
});     
          