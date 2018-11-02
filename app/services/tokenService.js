const Token = require('../models/tokenModel');
const Patient = require('../models/patientModel');

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
					var patient = new Patient(parseInt(possibleTokenPatientId));
					patient._getPatientRefFromPatientId().once("value", function(data) {
						if(data.val()) {
							resolve({
								isValid: true,
								patient: data.val()
							})
						}
						else {
							reject();
						}
					})
				}
				else {
					reject();
				}
			});
		});

		return validTokenFromTokenIdPromise;
	},

	validListTokenFromPatientId: function(patientId) {

		var getValidListFromPatientId = new Promise(function (resolve, reject) {
			var token = new Token(parseInt(patientId));
			token._getTokenRefFromPatientId().once("value", function(data) {
				if(data.val()) {
					const listOfValues = data.val();
					const listOfKeys = Object.keys(listOfValues);
					resolve({
						listOfTokens : listOfKeys
					});
				}
				else {
					reject();
				}
			});
		});
		return getValidListFromPatientId;
	}
};