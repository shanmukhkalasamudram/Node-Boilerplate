const { Model } = require('sequelize');
const { paginatePlugins } = require('./plugins/pagination.plugin');

module.exports = (sequelize, DataTypes) => {
    class test extends Model { }
    test.init(
        {
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'test',
        }
    );

    paginatePlugins(test);
    return test;
};
