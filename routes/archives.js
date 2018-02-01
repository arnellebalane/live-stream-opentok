const { get } = require('server/router');
const { json } = require('server/reply');
const opentok = require('../lib/opentok');

async function index(ctx) {
    function makeSerializable(object) {
        return Object.keys(object).reduce((acc, key) => {
            if (typeof object[key] !== 'function') {
                acc[key] = object[key];
            }
            return acc;
        }, {});
    }

    const response = await new Promise((resolve, reject) => {
        opentok.listArchives((err, archives) => {
            archives = archives.map(makeSerializable);
            resolve(archives);
        });
    });
    return json(response);
}

module.exports = [
    get('/archives', index)
];
