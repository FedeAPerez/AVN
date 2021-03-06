const Token = require('../models/tokenModel');
const Patient = require('../models/patientModel');
const Exercise = require('../models/exerciseModel');

module.exports = {
	createTokenFromPatient: function(patientId, exerciseId, repetitions) {
		var createTokenFromPatientPromise = new Promise (function (resolve, reject) {
			var token = new Token(patientId);
			token._getTokenRefFromPatientId().once("value", function(data) {
				token._selectStrattegyToAddFromData(data);
				token._createToken(exerciseId, repetitions,
					function() {
						resolve({
							"token": token._patientId + "_" + token._newSessionId
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
			let response = {
				patient : null,
				isValid : false,
				exercise : null,
				repetitions : 1
			};
			
			var token = new Token(parseInt(possibleTokenPatientId));
			token._getTokenSessionRefFromSessionId(possibleTokenSession).once("value", function(data) {
				if(data.val()) {
					response.repetitions = data.val().repetitions;
					let idExercise = data.val().idExercise;
					var patient = new Patient(parseInt(possibleTokenPatientId));
					patient._getPatientRefFromPatientId().once("value", function(data) {
						if(data.val()) {
							response.patient = data.val();
							response.isValid = true;
							var exercise = new Exercise();
							exercise._getByExerciseId(idExercise,
								function(exer) {
									response.exercise = exer;
									resolve(response);
								},
								function() {
									reject();
							});
						}
						else {
							resolve({
								isValid: false
							});
						}
					})
				}
				else {
					resolve({
						isValid: false
					});
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