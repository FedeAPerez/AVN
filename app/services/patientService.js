const Patient = require('../models/patientModel');

module.exports = {
	getAllPatients: function() {
        var getAllPatientsPromise = new Promise(function(resolve, reject) {
            var patient = new Patient();
            patient._getAll(
                function(list){
                    resolve({
                        patientsList : list
                    });
                },
                function(err) {
                    reject(err);
                });
        });

        return getAllPatientsPromise;
	},

	getPatient: function(patientId) {
		var getPatientPromise = new Promise(function(resolve, reject) {
			var patient = new Patient(parseInt(patientId));
			patient._getPatientRefFromPatientId().once("value", function(data) {
				if(data.val()) {
					resolve({
						patient: data.val()
					})
				}
				else {
					reject ({
						notFound: true
					});
				}
			});
		});

		return getPatientPromise;
	},
	updatePatient: function(patientId) {
		var updatePatientPromise = new Promise(function(resolve, reject) {
			resolve();
		});

		return updatePatientPromise;
	},
	deletePatient: function(patientId) {
		var deletePatientPromise = new Promise(function(resolve, reject) {
			var patient = new Patient(parseInt(patientId));
			patient._getPatientRefFromPatientId().remove(function(error) {
				if(error) {
					reject();
				}
				else {
					resolve();
				}
			});
		});
		return deletePatientPromise;
	}
};