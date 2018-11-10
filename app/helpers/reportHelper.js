const moment = require('moment');

module.exports = {
    fromListToReport(listOfSessions) {
        let listOfSessionReport = [];
        // A nivel de paciente
        listOfSessions.forEach(element => {
            let totalAdjustments = 0;
            let totalExercises = 0;
            let totalSessions = 0;
            // A nivel de sesion
            for(session in element.sessionsInfo) {
                if(session) {
                    totalSessions++;
                    // a nivel de ejercicio
                    element.sessionsInfo[session].forEach(exercise => {
                        totalExercises++;
                        totalAdjustments += exercise.Desvios;
                    });
                }
            }
            listOfSessionReport.push({
                idPatient: element.idPatient,
                adjustmentsDetected: totalAdjustments,
                exercisesMade: totalExercises,
                sessionsMade: totalSessions
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