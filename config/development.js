module.exports = {
    env: "development",
    port: 2020,
    mysql: {
        mobileDb: {
            connectionLimit: 20,
            acquireTimeout: 10000,
            charset: 'UTF8MB4_GENERAL_CI',
        }
    }
};



