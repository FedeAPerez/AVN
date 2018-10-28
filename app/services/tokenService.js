const Token = require('../models/tokenModel');

module.exports = {
	createTokenFromPatient: function(patientId) {
		var createTokenFromPatientPromise = new Promise (function (resolve, reject) {
			var token = new Token(patientId);
			console.log(token);
			token._getTokenRefFromPatientId().once("value", function(data) {
				token._selectStrattegyToAdd(data);
				token._createToken( 
					function(patient, session) {
						resolve({
							tokenNumber: token._patientId + "_" + token._newSessionId
						});
					}, 
					function() {
						reject({
							hasError: true
						});
					}
				);
			});
		});
		return createTokenFromPatientPromise;
		
	}
};