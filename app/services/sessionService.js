const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	saveData: function(data) {
		var ref = database.ref('sessions/' + 1234);
		return ref.set(data);
	}
};