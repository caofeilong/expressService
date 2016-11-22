'use strict';
/* jshint ignore:start */
var config = require('config');
var debug = require('debug')('service');

module.exports = function () {

    return function (err, req, res, next) {

        res.set('is-success', 0);

        if (err instanceof Error) {
            res.status(500);
            console.error(err.stack);
        }
        var error;
        if (typeof err === 'string') {
            error = err;
        } else if (err instanceof Error) {
            if (config.env === 'production') {
                error = 'InternalError';
            } else {
                error = err.toString();
            }
        } else {
            error = err;
        }
        res.locals.susanError = error;
        res.json({
            error: error
        });

        debug(error);
    };

};
/* jshint ignore:end */