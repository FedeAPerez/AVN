// server.js
const express        	= require('express');
const bodyParser     	= require('body-parser');
const cors 				= require('cors')
const app            	= express();

const crypto = require("crypto");

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
app.options('*', cors()); 

const interactionService = require('./app/services/interactionService');

// Prevent from favicon in API - NON EXISTANT -
app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
    res.locals.guid = crypto.randomBytes(16).toString("hex");
    res.locals.beginDate = new Date();
    console.log("Request received in route [" + req.path + "] from Id [" + res.locals.guid + "]");
    next();
});

require('./app/routes')(app);

app.use((req, res, next) => {
    var finishDate = new Date();
    var difference = (finishDate - res.locals.beginDate) / 1000;
    console.log("Request finished in route [" + req.path + "] from Id [" + res.locals.guid + "] in " + difference + " seconds.");
    interactionService.saveIntercation(req, res, difference);
    next();
});

app.listen((port), () => {
	console.log('Se está ejecutando en el puerto: ' + port);
});     
          