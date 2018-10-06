const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	getToken: function() {
		var ref = database.ref('tokens/' + 1234);
		return ref.set({
			token: "1234",
			patientId: "12",
			sessionId: "34"
		});
	}
};