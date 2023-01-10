const config = {
    APP: {
        MORGAN_LOG_LEVEL: process.env.MORGAN_LOG_LEVEL || 'combined',
        NODE_ENV: process.env.NODE_ENV || 'test',
        PORT: process.env.PORT || 5000,
    },
    LOGGER: {
        LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
        MORGAN_LOG_LEVEL: process.env.MORGAN_LOG_LEVEL || 'combined',
        SILENT_LOGGER: process.env.SILENT_LOGGER || false,
    },
    DB: {
        SQL: {
            NAME: process.env.DATABASE_NAME,
            USERNAME: process.env.DATABASE_USERNAME,
            PASSWORD: process.env.DATABASE_PASSWORD,
            HOST: process.env.DATABASE_HOST,
            PORT: process.env.DATABASE_PORT,
        },
    },
};
module.exports = config;
