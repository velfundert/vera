var config = require("../config/config");
var Event = require('../models/event');
var packageJson = require('../../package.json')
var moment = require('moment');


exports.testmyself = function (req, res, next) {
    var startTime = Date.now();

    var selftestResult = {
        "application": "vera",
        "version": packageJson.version,
        "timestamp": moment(),
        "aggregate_result": 0,
        "checks": []
    }

    Event.findOne().exec(function (err, event) {
        var endTime =  Date.now();
        var checkResult = {
            "endpoint": config.dbUrl,
            "description": "Check mongodb connectivity",
            "checkResult": 0,
            "respopnseTime": (endTime - startTime) + " ms"
        }


        if(err || !event) {
            checkResult.result = 1;
            checkResult.errorMessage = (err) ? "mongodb problems" : "no data in db?"
            if(err) {
                checkResult.stackTrace= err
            }
            res.statusCode = 500;
        }

        selftestResult.checks.push(checkResult)

        res.header("Content-Type", "application/json; charset=utf-8");
        res.json(selftestResult);

    });
}
