const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	saveData: function(data) {
		try {
			/*var parsedData;
			parsedData = JSON.parse(data);*/
			data.forEach(element => {
				var ref = database.ref('/session/' + element.Token_id);
				return ref.set(element);
			});
		}
		catch(err) {
			throw new Error("Error al guardar los datos");
		}
	}
};