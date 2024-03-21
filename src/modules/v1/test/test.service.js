const {post } = require('../../../util/event-bus');

const get = async () => {
    let data = 'test';
    await post({data: 'Need to go for Shopping',date: 3000})
    return {
        data,
    };
};

module.exports = { get };
