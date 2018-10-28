const firebase = require('firebase-admin');
const database = firebase.database();

module.exports = {
	saveData: function(data) {
		return new Promise(function(resolve, reject) {
			try {
				data.forEach(element => {
					const tokenSplited = element.Token.split('_');
					var ref = database.ref('/session/' + tokenSplited[0] + '/' + tokenSplited[1] + '/' + element.Ejercicio);
					ref.set(element);
				});
				resolve(204);
			}
			catch(err) {
				console.error("Error al guardar los datos de sesión");
				console.error(err);
				reject("Error al guardar los datos");
			}
		});

	}
};
