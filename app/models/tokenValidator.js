module.exports = {
    validatedCreate: function(req, shouldIgnore = false) {
        let validatorObj = {
            error : false,
            description : []
        };

        // Id de Paciente
        if(!req.body.patientId) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el id del paciente.",
                paramNeeded: "patientId" 
            });
        }

        // Id de Ejercicio
        if(!req.body.exerciseId) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el id del ejercicio.",
                paramNeeded: "exerciseId" 
            });
        }

        // Id de Ejercicio
        if(!req.body.repetitions) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta la cantidad de repeticiones.",
                paramNeeded: "repetitions" 
            });
        }

        return validatorObj;
    }
};