"use strict";

var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var mkdirp = require('mkdirp');
var config = require('config');

morgan.token('remoteIp', function (req) {
    return req.get('remoteip') || req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) ||
        'Unknown';
});

module.exports = function () {
    var logDir = path.join(config.logDir, 'morgan');

    if (!fs.existsSync(logDir)) {
        mkdirp.sync(logDir);
    }

    var accessLogfile = fs.createWriteStream(path.join(logDir, 'nodejs-access.log'), {
        flags: 'a'
    });

    // https://github.com/expressjs/morgan
    let logFormat = ':remoteIp - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"';
    return morgan(logFormat, {
        stream: accessLogfile,
        skip: function (req, res) {
            return res.statusCode === 404;
        }
    });
};
