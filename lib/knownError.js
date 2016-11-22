function KnownError(opts) {
    this.code = parseInt(opts.code) || 0;
    this.message = opts.message;
}

module.exports = exports = function (code, message) {
    const opts = (typeof code === 'object') ? code : {code, message};
    return new KnownError(opts);
};

exports.is = function (error) {
    return error instanceof KnownError;
};
