const nock = require('nock');
const config = require('config');


//API 
nock(API_END_POINT)
    .get()
    .query({ params: { phrId: phr_id } })
    .times(1)
    .reply(200, {
        "firstName": "Shanmukhasai",
        "lastName": "K",
    });
