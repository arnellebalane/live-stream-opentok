const { get } = require('server/router');
const { json, render, status } = require('server/reply');
const opentok = require('../lib/opentok');
const store = require('../lib/store');

function index(ctx) {
    return render('broadcaster.html');
}

async function session(ctx) {
    const id = ctx.params.id;

    const response = await new Promise((resolve, reject) => {
        const sessionOptions = {
            mediaMode: 'routed'
        };

        opentok.createSession(sessionOptions, (err, session) => {
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

async function start(ctx) {
    const id = ctx.params.id;
    const { session } = store.get(id);

    await new Promise((resolve, reject) => {
        const options = {
            name: id + ' stream'
        };
        opentok.startArchive(session.sessionId, options, (err, archive) => {
            resolve(archive);
        });
    });
    return status(200);
}

async function stop(ctx) {
    const id = ctx.params.id;
    const { session } = store.get(id);

    await new Promise((resolve, reject) => {
        opentok.stopArchive(session.sessionId, (err, archive) => {
            resolve(archive);
        });
    });
    return status(200);
}

module.exports = [
    get('/broadcaster/:id', index),
    get('/broadcaster/:id/session', session),
    get('/broadcaster/:id/start', start),
    get('/broadcaster/:id/stop', stop)
];
