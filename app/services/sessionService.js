const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	saveData: function(data) {
		var ref = database.ref('/session/' + data.token_id);
		return ref.set(data);
	}
};