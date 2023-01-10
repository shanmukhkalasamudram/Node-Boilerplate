const app = require('../src/app');
const request = require('supertest');
const { expect } = require('chai');
const dbHandler = require('./utils/db');
const { setupModels, models } = require('../src/models');


describe('Test cases for Profile', () => {
    before(async () => {
        //Before Hook
        sequelize = await dbHandler.connect();
    });

    after(async () => {
        //After Hook
        await dbHandler.disconnect(sequelize);
    });

    it('[GET] Test API ', async () => {
        const response = await request(app)
            .get(`/api/v1/test`)
            .send();
        expect(response.body.is_success).to.be.true;
    });
});