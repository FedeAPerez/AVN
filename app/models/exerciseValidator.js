module.exports = {
    validatedCreate: function(req, shouldIgnore = false) {
        let validatorObj = {
            error : false,
            description : []
        };

        // Dificultad
        if(!req.body.difficulty) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta la dificultad del ejercicio.",
                paramNeeded: "difficulty" 
            });
        }
        else {
            if([1, 2, 3].indexOf(parseInt(req.body.difficulty)) === -1) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "La dificultad del ejercicio debe ser alguna de las siguientes [1, 2, 3]",
                    paramNeeded: "difficulty" 
                });
            }
        }

        // Nombre
        if(!req.body.name) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el nombre del ejercicio.",
                paramNeeded: "name" 
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