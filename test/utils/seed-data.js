const _ = require('lodash');
const sequelize = require('sequelize');


const createProfile = async (models) => {
    const { test } = models;
    await test.create({
        firstName: "Shanmukha",
        lastName: "Sai"
    })
}

module.exports = { createProfile, }