const moment = require('moment');

module.exports = {
    fromListToReport(listOfSessions) {
        let listOfSessionReport = [];                
        /*const data = [
            {name: 'Ejercicio 1', uv: 4 },
            {name: 'Ejercicio 2', uv: 21 },
            {name: 'Ejercicio 3', uv: 2 },
            {name: 'Ejercicio 4', uv: 21 },
            {name: 'Ejercicio 5', uv: 7 }
        ];*/
        // A nivel de paciente
        listOfSessions.forEach(element => {
            let totalAdjustments = 0;
            let totalExercises = 0;
            let totalSessions = 0;
            let graphData = [];
            // A nivel de sesion
            for(var session in element.sessionsInfo) {
                if(session) {
                    totalSessions++;
                    // a nivel de ejercicio
                    let arr = Object.values(element.sessionsInfo[session]);
                    arr.forEach(exercise => {
                        totalExercises++;
                        totalAdjustments += exercise.Desvios;
                        graphData.push({
                            name: "Ejercicio " + totalExercises,
                            uv: exercise.Desvios
                        });
                    });
                }
            }
            listOfSessionReport.push({
                idPatient: element.idPatient,
                adjustmentsDetected: totalAdjustments,
                exercisesMade: totalExercises,
                sessionsMade: totalSessions,
                graphData: graphData
            });
        });
        return listOfSessionReport;
    },
    completeListWithData(listOfSessions, listOfPatients) {
        let list = Object.assign([], listOfSessions);
        list.forEach(elem => {
            listOfPatients.forEach(patient => {
                if(patient.idPatient == elem.idPatient) {
                    elem.name = patient.name;
                    var a = moment(patient.beginDate, "D/M/YYYY");
                    var b = moment();
                    elem.daysInProgram = b.diff(a, 'days');
                }
            })
        });
        return list;
    }
};