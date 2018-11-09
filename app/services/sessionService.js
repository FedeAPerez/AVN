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

	},
	getReportOfPatients: function() {
		return new Promise(function(resolve, reject) {
			resolve({
				listOfStats : [
					{ name: "Federico Pérez", adjustmentsLess: 65, exercisesMade: 24, sessionsMade: 12, daysInProgram: 120 },
					{ name: "Gabriel Bonaventura", adjustmentsLess: 13, exercisesMade: 10, sessionsMade: 4, daysInProgram: 30 },
					{ name: "Ariel Molina", adjustmentsLess: 5, exercisesMade: 2, sessionsMade: 1, daysInProgram: 10 }
				]
			});
		});
	}

};
