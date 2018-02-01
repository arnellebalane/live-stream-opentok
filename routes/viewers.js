const { get } = require('server/router');
const { render } = require('server/reply');

function index(ctx) {
    return render('viewer.html');
}

module.exports = [
    get('/viewer/:id', index)
];
