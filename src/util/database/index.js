const config = require('config');
const logger = require('../logger/logger.util');
const sql = require('./sql-handler');

let connection = {};

const connectDB = async () => {
    if (config.DB.SQL) {
        connection.sql = await sql.connect();
        return connection.sql;
    }
    logger.error('Mongo DB: Configuration not available in config.');

    return connection;
};

const disconnectDB = async () => {
    if (connection.mongo) {
        await connection.mongo.close();
    } else {
        logger.info('Mongo DB: Configuration not available in config.');
    }
};

module.exports = { connectDB, disconnectDB, connection };
