const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	saveData: function(data, token_id) {
		var ref = database.ref('/session/' + token_id);
		return ref.set(data);
	}
};