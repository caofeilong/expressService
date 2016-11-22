"use strict";

var request = require('request');
var Promise = require('bluebird');

module.exports = function (options) {
    return Promise.promisify(request)(options).then(function (result) {
        return result.body;
    });
};
