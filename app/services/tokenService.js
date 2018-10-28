const Token = require('../models/tokenModel');

module.exports = {
	createTokenFromPatient: function(patientId) {
		var createTokenFromPatientPromise = new Promise (function (resolve, reject) {
			var token = new Token(patientId);
			token._getTokenRefFromPatientId().once("value", function(data) {
				token._selectStrattegyToAddFromData(data);
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
	},

	validTokenFromTokenId: function(tokenValue) {
		var validTokenFromTokenIdPromise = new Promise(function (resolve, reject) {
			const tokenValueReg = tokenValue.split('_');
			const possibleTokenPatientId = tokenValueReg[0];
			const possibleTokenSession = tokenValueReg[1];
			
			var token = new Token(parseInt(possibleTokenPatientId));
			token._getTokenSessionRefFromSessionId(possibleTokenSession).once("value", function(data) {
				if(data.val()) {
					resolve({
						isValid: true
					})
				}
				else {
					resolve ({
						isValid: false
					});
				}
			});
		});

		return validTokenFromTokenIdPromise;
	}
};