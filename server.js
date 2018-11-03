// server.js
const APIPORT = Number(process.env.PORT);
const firebase = require('./config/firebase');
firebase.init();
const app = require('./config/app');

app.listen((APIPORT), () => {
	console.log('Se está ejecutando en el puerto: ' + APIPORT);
});     
          