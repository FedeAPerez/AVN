module.exports = {
    validated: function(req) {
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
        else {
            if(Object.keys(req.body.initialState).indexOf("hombroArribaAbajo")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Hombro Arriba Abajo de estado inicial",
                    paramNeeded: "initialState.hombroArribaAbajo"
                });
            }
        }

        return validatorObj;
    }
};