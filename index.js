const server = require('server');
const { error } = server.router;
const { status, send } = server.reply;

server(
    error(ctx => status(500).send(ctx.error.message))
).then(ctx => {
    ctx.log.info(`Server is now running at localhost:${ctx.options.port}`);
});
