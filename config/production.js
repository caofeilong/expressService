module.exports = {
    env: 'production',
    port: 16658,
    mysql: {
        mobileDb: {
            connectionLimit: 20,
            charset: 'UTF8MB4_GENERAL_CI',
        }
    }
};
