module.exports = (fastify, opts, done) => {
  fastify.get("/health", () => "ok");

  done();
};
