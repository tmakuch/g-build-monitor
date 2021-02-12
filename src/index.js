const config = require("../config");
const plugins = require("./monitor/monitor");
const { Subject } = require("rxjs");

module.exports = (fastify, opts, done) => {
  fastify.get("/health", () => "ok");

  const webhookStream = new Subject();
  fastify.post("/webhooks", (req) => {
    webhookStream.next({
      headers: req.headers,
      body: req.body,
    });
  });

  const monitorData = plugins.init(
    fastify,
    config.monitorConfig,
    webhookStream,
  );

  fastify.io.of("/").on("connection", (socket) => {
    fastify.log.info("Socket connected: " + socket.id);

    const fullSub = monitorData.getFullStream().subscribe((full) => {
      fastify.log.info(
        `Sending full info for ${socket.id}: ${JSON.stringify(full)}`,
      );
      socket.emit("full", full);
    });

    const partialSub = monitorData.getPartialStream().subscribe((partial) => {
      fastify.log.info(
        `Sending partial info for ${socket.id}: ${JSON.stringify(partial)}`,
      );
      socket.emit("partial", partial);
    });

    socket.on("disconnect", () => {
      fastify.log.info("Socket disconnected: " + socket.id);
      fullSub.unsubscribe();
      partialSub.unsubscribe();
    });
  });

  done();
};
