const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	saveData: function(data) {
		return new Promise(function(resolve, reject) {
			try {
				data.forEach(element => {
					var ref = database.ref('/session/' + element.Token + '/' + element.Ejercicio);
					ref.set(element);
				});
				resolve(204);
			}
			catch(err) {
				reject("Error al guardar los datos");
			}
		});

	}
};
