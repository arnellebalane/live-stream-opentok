const { get } = require('server/router');
const { json, render } = require('server/reply');
const store = require('../lib/store');

function index(ctx) {
    return render('viewer.html');
}

function session(ctx) {
    const id = ctx.params.id;
    const { session } = store.get(id);

    const token = session.generateToken({
        role: 'subscriber',
        expireTime: (Date.now() / 1000) + (24 * 60 * 60),
        data: `user=${id},role=subscriber`
    });

    return json({
        apiKey: process.env.OPENTOK_API_KEY,
        sessionId: session.sessionId,
        token: token
    });
}

module.exports = [
    get('/viewer/:id', index),
    get('/viewer/:id/session', session)
];
