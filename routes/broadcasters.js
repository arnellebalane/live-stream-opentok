const { get } = require('server/router');
const { render } = require('server/reply');

function index(ctx) {
    return render('broadcaster.html');
}

module.exports = [
    get('/broadcaster/:id', index)
];
