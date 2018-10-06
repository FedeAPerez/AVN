const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	getToken: function() {
		var ref = database.ref('tokens/' + 1234);
		return ref.set({
			token: "38662776_01",
			patientId: "1",
			sessionId: "1",
			centerId: "1"
		});
	}
};