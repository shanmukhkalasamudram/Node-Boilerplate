const { Sequelize } = require('sequelize');
const config = require('config');
const _ = require('lodash');
const boom = require('@hapi/boom');
const logger = require('../logger/logger.util');
const { setupModels } = require('../../models');

const connect = async () => {
    const sequelize = new Sequelize(
        _.get(config, 'DB.SQL.NAME'),
        _.get(config, 'DB.SQL.USERNAME'),
        _.get(config, 'DB.SQL.PASSWORD'),
        {
            host: _.get(config, 'DB.SQL.HOST'),
            port: _.get(config, 'DB.SQL.PORT'),
            dialect: 'mysql',
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

module.exports = { connect };
