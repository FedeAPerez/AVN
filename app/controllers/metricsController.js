const interactionService = require('../services/interactionService');
const crypto = require("crypto");
const SHOULDNT_LOG_METRICS = process.env.SHOULDNT_LOG_METRICS;

module.exports = {
    createRequest: function(req, res, next) {
        res.locals.guid = crypto.randomBytes(16).toString("hex");
        res.locals.beginDate = new Date();
        if(!!SHOULDNT_LOG_METRICS)
            console.log("Request received in route [" + req.path + " - " + req.method + "] from Id [" + res.locals.guid + "]");
        next();
    },
    finishRequest: function(req, res, next) {
        var finishDate = new Date();
        var difference = (finishDate - res.locals.beginDate) / 1000;
        if(!!SHOULDNT_LOG_METRICS)
            console.log("Request finished in route [" + req.path + " - " + req.method + "] from Id [" + res.locals.guid + "] in " + difference + " seconds.");
        interactionService.saveInteraction(req, res, difference);
        next();
    }
};