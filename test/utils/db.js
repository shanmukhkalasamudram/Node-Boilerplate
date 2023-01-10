const { Sequelize } = require('sequelize');
const config = require('config');
const _ = require('lodash');
const boom = require('@hapi/boom');
const logger = require('../../src/util/logger/logger.util');
const { setupModels } = require('../../src/models');

const connect = async () => {
    const sequelize = new Sequelize(
        _.get(config, 'DB.SQL.NAME'),
        _.get(config, 'DB.SQL.USERNAME'),
        _.get(config, 'DB.SQL.PASSWORD'),
        {
            host: _.get(config, 'DB.SQL.HOST'),
            port: _.get(config, 'DB.SQL.PORT'),
            dialect: 'mysql',
            dialectOptions: {
                useUTC: true,
            },
            timezone: '+05:30',
            logging: _.get(config, 'APP.NODE_ENV') === 'development',
        }
    );

    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error(error);
        throw new boom.internal(error);
    }

    try {
        await setupModels(sequelize);
    } catch (error) {
        throw new boom.internal(error);
    }
    sequelize.sync();
    return sequelize;
};

const disconnect = async (sequelize) => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null);
    await sequelize.truncate({ cascade: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null);
};

module.exports = { connect, disconnect };
