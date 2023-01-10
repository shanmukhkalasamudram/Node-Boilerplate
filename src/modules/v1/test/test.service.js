const boom = require('@hapi/boom');
const { models } = require('../../../models');


const get = async () => {
    const { test } = models;
    let data;
    try {
        data = await test.findAll({});
    } catch (err) {
        throw boom.badData('Cant fetch details');
    }
    return {
        data,
    };
};

const post = async () => {
    const { test } = models;
    let data;
    try {
        data = await test.create({
            firstName: 'Shanmukh',
            lastName: 'Sai'
        });
    } catch (err) {
        throw boom.badData('data not Saved');
    }
    return {
        data,
    };
};

module.exports = { get, post };
