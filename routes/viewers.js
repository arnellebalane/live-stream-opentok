const { get } = require('server/router');
const { json, render } = require('server/reply');
const store = require('../lib/store');

function index(ctx) {
    return render('viewer.html');
}

function session(ctx) {
    const id = ctx.params.id;
    const { session } = store.get(id);

    return json({
        apiKey: process.env.OPENTOK_API_KEY,
        sessionId: session.sessionId
    });
}

module.exports = [
    get('/viewer/:id', index),
    get('/viewer/:id/session', session)
];
