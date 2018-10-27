const interactionService = require('../services/interactionService');
const crypto = require("crypto");

module.exports = {
    createRequest: function(req, res, next) {
        res.locals.guid = crypto.randomBytes(16).toString("hex");
        res.locals.beginDate = new Date();
        console.log("Request received in route [" + req.path + " - " + req.method + "] from Id [" + res.locals.guid + "]");
        next();
    },
    finishRequest: function(req, res, next) {
        var finishDate = new Date();
        var difference = (finishDate - res.locals.beginDate) / 1000;
        console.log("Request finished in route [" + req.path + " - " + req.method + "] from Id [" + res.locals.guid + "] in " + difference + " seconds.");
        interactionService.saveInteraction(req, res, difference);
        next();
    }
};