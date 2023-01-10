const errorDecorator = require('../../../util/error-decorator/error-decorator.util');
const service = require('./test.service');

const get = errorDecorator(async (req, _res, next) => {
    const data = await service.get();
    next(data);
});

const post = errorDecorator(async (req, _res, next) => {
    const data = await service.post();
    next(data);
});

module.exports = {
    get,
    post
};
