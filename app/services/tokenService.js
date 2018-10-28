const Token = require('../models/tokenModel');

module.exports = {
	createTokenFromPatient: function(patientId) {
		var createTokenFromPatientPromise = new Promise (function (resolve, reject) {
			Token.getTokenRefFromPatientId(patientId).once("value", function(data) {
				if(!data.val()) {
					const newToken = Token.getNewTokenRefFromPatientId(patientId);
					Token.createTokenObjectFromRef(newToken.refCreated, 
					function() {
						resolve({
							tokenNumber: patientId + "_" + newToken.beginSessionId
						});
					}, 
					function() {
						reject({
							hasError: true
						});
					});
				}
				else {
					const newToken = Token.getUpdatedTokenRefFromPatientId(data, patientId);
					Token.createTokenObjectFromRef(newToken.refUpdated, 
					function() {
						resolve({
							tokenNumber: patientId + "_" + newToken.updatedSessionId
						});
					},
					function() {
						reject({
							hasError: true
						});	
					});
				}
			});
		});
		return createTokenFromPatientPromise;
		
	}
};