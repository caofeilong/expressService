'use strict';

module.exports = function () {
    return function (req, res, next) {
        let origin = req.get('origin');

        if (/^https?:\/\/(localhost|[a-z]+\.fengjr\.com):?\d*$/i.test(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        }
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    };
};
