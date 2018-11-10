const firebase = require('firebase-admin');
const database = firebase.database();
// Modelos
const Patient = require('../models/patientModel');
const Session = require('../models/sessionModel');
// Helpers
const PatientHelper = require('../helpers/patientHelper');
const ReportHelper = require('../helpers/reportHelper');

module.exports = {
	saveData: function(data) {
		return new Promise(function(resolve, reject) {
			try {
				data.forEach(element => {
					const tokenSplited = element.Token.split('_');
					var ref = database.ref('/session/' + tokenSplited[0] + '/' + tokenSplited[1] + '/' + element.Ejercicio);
					ref.set(element);
				});
				resolve(204);
			}
			catch(err) {
				console.error("Error al guardar los datos de sesión");
				console.error(err);
				reject("Error al guardar los datos");
			}
		});

	},

	getReportOfPatients: function() {
		return new Promise(function(resolve, reject) {
			let patientModel = new Patient();
			patientModel._getAll(function(res) {
				let listOfPatients = PatientHelper.fromListOfPatientsToBasicData(res);
				let sessionModel = new Session();
				sessionModel._getAllFilteredByPatient(listOfPatients, function(data) {
					let listOfSessionsByIdPatient = ReportHelper.fromListToReport(data);
					let listOfSessionsInReport = ReportHelper.completeListWithData(listOfSessionsByIdPatient, listOfPatients);
					console.log(listOfSessionsInReport);
					resolve({
						listOfStats : listOfSessionsInReport
					});
				}, function(err) {
					console.log("no encontró data de sessiones");
				})
			})
		});
	}

};
