// Nombre de ruta
const EXERCISE_ROUTE ="/exercise";
// HTTP Utils
const HTTP_CODE = require('../builder/httpBuilder').HTTP_CODE;
const HTTP_METHOD = require('../builder/httpBuilder').HTTP_METHOD;
const httpBuilder = require('../builder/httpBuilder');
// Service a consumir
const exerciseService = require('../services/exerciseService');
const exercisevalidator = require('../models/exerciseValidator');

module.exports = {
    deleteExercise: function(req, res, next) {
        exerciseService.deleteExercise(req.params.idExercise)
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.DELETE, HTTP_CODE.OK));
            next();
        })
        .catch((err) => {
            res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.DELETE, HTTP_CODE.ERROR));
            next();
        });
    },

    createExercise: function(req, res, next) {
        let validator = exercisevalidator.validatedCreate(req);
        if(!validator.error) {
            exerciseService.createExercise(req.body)
            .then((result) => {
                res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.POST, HTTP_CODE.OK, result));
                next();
            })
            .catch((err) => {
                res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.POST, HTTP_CODE.ERROR));
                next();
            });
        }
        else {
            res.status(HTTP_CODE.BAD_REQUEST).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.POST, HTTP_CODE.BAD_REQUEST, validator));
            next();
        }
    },

    updateExercise: function(req, res, next) {
        let validator = exercisevalidator.validateUpdate(req);
        if(!validator.error) {
            exerciseService.updateExercise(req.params.idExercise, req.body)
            .then((result) => {
                res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.PUT, HTTP_CODE.OK, result));
                next();
            })
            .catch((err) => {
                res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.PUT, HTTP_CODE.ERROR));
                next();
            });
        }
        else {
            res.status(HTTP_CODE.BAD_REQUEST).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.PUT, HTTP_CODE.BAD_REQUEST, validator));
            next();
        }
    },

    getAllExercises: function(req, res, next) {
        exerciseService.getAllExercises()
        .then((result) => {
            res.status(HTTP_CODE.OK).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.GET, HTTP_CODE.OK, result));
            next();
        })
        .catch((err) => {
            res.status(HTTP_CODE.ERROR).send(httpBuilder.constructHttpResponse(EXERCISE_ROUTE, HTTP_METHOD.GET, HTTP_CODE.ERROR));
            next();
        });
    }
};