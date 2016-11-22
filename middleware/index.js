'use strict';
var bodyParser = require("body-parser");

module.exports = {
    logger: require('./logger'),

    redirect: require('./redirect'),

    json: bodyParser.json,

    raw: bodyParser.raw,

    cookieParser: require('cookie-parser'),

    error: require('./error'),

    allowCrossDomain: require('./cross-domain'),

};
