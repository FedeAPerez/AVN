const Token = require('../models/tokenModel');

module.exports = {
	createTokenFromPatient: function(patientId) {
		var createTokenFromPatientPromise = new Promise (function (resolve, reject) {
			Token.getTokenRefFromPatientId(patientId).once("value", function(data) {
				if(!data.val()) {
					const newToken = Token.getNewTokenRefFromPatientId(patientId);
					newToken.refUpdated.set({
						validated : false
					}).then(function(error) {
						if(error) {
							console.error("Error al generar token");
							reject();
						}
						else {
							resolve ({
								tokenNumber: patientId + "_" + newToken.beginSessionId
							})
						}
					});
				}
				else {
					const newToken = Token.getUpdatedTokenRefFromPatientId(data, patientId);
					newToken.refUpdated.set({
						validated : false
					}).then(function(error) {
						if(error) {
							console.error("Error al generar token");
							reject();
						}
						else {
							resolve({
								tokenNumber: patientId + "_" + newToken.updatedSessionId
							});
						}
					});
				}
			});
		});
		return createTokenFromPatientPromise;
		
	}
};