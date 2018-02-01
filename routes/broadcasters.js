const { get } = require('server/router');
const { json, render } = require('server/reply');
const opentok = require('../lib/opentok');
const store = require('../lib/store');

function index(ctx) {
    return render('broadcaster.html');
}

async function session(ctx) {
    const id = ctx.params.id;

    const response = await new Promise((resolve, reject) => {
        opentok.createSession((err, session) => {
            const token = session.generateToken({
                role: 'publisher',
                expireTime: (Date.now() / 1000) + (24 * 60 * 60),
                data: `user=${id}`
            });
            store.set(id, { session, token });

            resolve({
                apiKey: process.env.OPENTOK_API_KEY,
                sessionId: session.sessionId,
                token: token
            });
        });
    });
    return json(response);
}

module.exports = [
    get('/broadcaster/:id', index),
    get('/broadcaster/:id/session', session)
];
