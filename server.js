// server.js
const express        	= require('express');
const bodyParser     	= require('body-parser');
const cors 				= require('cors')
const app            	= express();
var port = Number(process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors()); 

app.use((req, res, next) => {
    console.log("Telemetría a futuro para rutas " + req.path);
    next();
});

require('./app/routes')(app);

app.listen((port), () => {
	console.log('Se está ejecutando en el puerto: ' + port);
});     
          