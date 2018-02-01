const server = require('server');
const { error } = server.router;
const { status, send } = server.reply;
const routes = require('auto-load')('routes');

server(
    routes.broadcasters,
    routes.viewers,

    error(ctx => {
        ctx.log.error(ctx.error);
        return status(500).send(ctx.error.message);
    })
).then(ctx => {
    ctx.log.info(`Server is now running at localhost:${ctx.options.port}`);
});
