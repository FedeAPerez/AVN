const Patient = require('../models/patientModel');

module.exports = {
	getPatient: function(patientId) {
		var getPatientPromise = new Promise(function (resolve, reject) {
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
	}
};