const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	getToken: function(patientId) {
		var ref = database.ref('tokens/' + patientId);
		return ref.set({
			token: patientId + "_01",
			patientId: "1",
			sessionId: "1",
			centerId: "1"
		});
	}
};