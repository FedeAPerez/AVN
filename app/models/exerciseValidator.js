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
            if(Object.keys(req.body.initialState).indexOf("hombroAdelanteAtras")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Hombro Adelante Atras de estado inicial",
                    paramNeeded: "initialState.hombroAdelanteAtras"
                });
            }
            if(Object.keys(req.body.initialState).indexOf("codoArribaAbajo")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Codo Arriba Abajo de estado inicial",
                    paramNeeded: "initialState.codoArribaAbajo"
                });
            }
            if(Object.keys(req.body.initialState).indexOf("codoDerechaIzquierda")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Codo Derecha Izquierda de estado inicial",
                    paramNeeded: "initialState.codoDerechaIzquierda"
                });
            }
        }

        // Estado final
        if(Object.keys(req.body).indexOf("endingState") === -1) {
            validatorObj.error = true;
            validatorObj.description.push({
                desc: "Falta el objeto de estado final",
                paramNeeded: "endingState" 
            });
        }
        else {
            if(Object.keys(req.body.initialState).indexOf("hombroArribaAbajo")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Hombro Arriba Abajo de estado final",
                    paramNeeded: "endingState.hombroArribaAbajo"
                });
            }
            if(Object.keys(req.body.initialState).indexOf("hombroAdelanteAtras")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Hombro Adelante Atras de estado final",
                    paramNeeded: "endingState.hombroAdelanteAtras"
                });
            }
            if(Object.keys(req.body.initialState).indexOf("codoArribaAbajo")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Codo Arriba Abajo de estado final",
                    paramNeeded: "endingState.codoArribaAbajo"
                });
            }
            if(Object.keys(req.body.initialState).indexOf("codoDerechaIzquierda")) {
                validatorObj.error = true;
                validatorObj.description.push({
                    desc: "Falta el parametro Codo Derecha Izquierda de estado final",
                    paramNeeded: "endingState.codoDerechaIzquierda"
                });
            }
        }

        return validatorObj;
    }
};