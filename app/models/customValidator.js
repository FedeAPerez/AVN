module.exports = {
    validatedCreate: function(req, shouldIgnore = false) {
        let validatorObj = {
            error : false,
            description : []
        };

        // Paciente
        if(!req.params.idPatient) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el id de paciente en el parametro",
                paramNeeded: "idPatient" 
            });
        }

        // Ejercicio
        if(!req.params.idExercise) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el id del ejercicio en el parametro",
                paramNeeded: "idExercise" 
            });
        }

        // Estado inicial
        if(Object.keys(req.body).indexOf("initialState") === -1) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el objeto de estado inicial",
                paramNeeded: "initialState" 
            });
        }

        // Estado final
        if(Object.keys(req.body).indexOf("endingState") === -1) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el objeto de estado final",
                paramNeeded: "endingState" 
            });
        }
        
        if(shouldIgnore) {
            validatorObj.error = false;
        }
        return validatorObj;
    },

    validateUpdate : function(req) {
        return this.validatedCreate(req, false)
    }
};