"use strict";

module.exports = function (url) {
    return function (req, res) {
        res.redirect(url);
    };
};
