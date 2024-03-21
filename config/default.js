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
    CONNECTION_STRING: process.env.CONNECTION_STRING || '123456',
    QUEUE_NAME:  process.env.QUEUE_NAME || '123456',
};
module.exports = config;
