const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	createTokenFromPatient: function(patientId) {
		var createTokenFromPatientPromise = new Promise (function (resolve, reject) {
			var ref = database.ref('tokens/' + patientId);
			ref.once("value", function(data) {
			if(!data.val()) {
				const beginSessionId = 1;
				var refUpdated = database.ref('tokens/' + patientId + '/' + beginSessionId);
				return refUpdated.set({
					validated : false
				}).then(function(error) {
					if(error) {
						console.error("Error al generar token");
						reject();
					}
					else {
						resolve ({
							tokenNumber: patientId + "_" + beginSessionId
						})
					}
				});
			}
			else {
				const sessionsCreated = Object.keys(data.val());
				const newSessionId = parseInt(sessionsCreated[sessionsCreated.length - 1]) + 1;
				var refUpdated = database.ref('tokens/' + patientId + '/' + newSessionId);
				return refUpdated.set({
					validated : false
				}).then(function(error) {
					if(error) {
						console.error("Error al generar token");
						reject();
					}
					else {
						resolve({
							tokenNumber: patientId + "_" + newSessionId
						});
					}
				});
			}
		});
		});
		return createTokenFromPatientPromise;
		
	}
};