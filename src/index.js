const config = require("../config");
const pullPRs = require("./utils/pullPRs");

module.exports = (fastify, opts, done) => {
  fastify.get("/health", () => "ok");

  fastify.get(
    "/pulls",
    async () => (await pullPRs(config.repo.name, config.repo.token)).data,
  );

  done();
};
