const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	saveData: function(data) {
		try {
			var parsedData;
			parsedData = JSON.parse(data);
			var ref = database.ref('/session/' + parsedData.token_id);
			return ref.set(parsedData);
		}
		catch(err) {
			throw new Error("Error al guardar los datos");
		}
	}
};