module.exports = {
    env: "development",
    port: 2030,
    mysql: {
        mobileDb: {
            connectionLimit: 20,
            acquireTimeout: 10000,
            charset: 'UTF8MB4_GENERAL_CI',
        }
    }
};



