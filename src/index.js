const config = require("../config");
const plugins = require("./monitor/monitor");

module.exports = (fastify, opts, done) => {
  fastify.get("/health", () => "ok");

  const monitorData = plugins.init(fastify, config.monitorConfig, null);

  fastify.io.of("/").on("connection", (socket) => {
    fastify.log.info("Socket connected: " + socket.id);

    const sub = monitorData.getStream().subscribe((tick) => {
      fastify.log.info(`Ticking for ${socket.id}: ${JSON.stringify(tick)}`);
      socket.emit("tick", tick);
    });

    socket.on("disconnect", () => {
      fastify.log.info("Socket disconnected: " + socket.id);
      sub.unsubscribe();
    });
  });

  done();
};
