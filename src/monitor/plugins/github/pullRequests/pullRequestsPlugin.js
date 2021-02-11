const { Observable } = require("rxjs");
const pullPRs = require("./makePRRequest");

module.exports = (fastify, config, webhookStream) => {
  const fullStream = new Observable(async (subscriber) => {
    try {
      fastify.log.info("Github PRs - pulling");
      const pull = await pullPRs(config.name, config.token);

      fastify.log.info("Github PRs - pulling successful");
      // subscriber.next(pull.data);
      subscriber.next(pull.data.map((pr) => pr.url));
    } catch (err) {
      fastify.log.error(`Github PRs - error while pulling: `, err.message);
      fastify.log.verbose(err);
      subscriber.error(err);
    }
  });
  // const partialStream = webhookStream.pipe(); filter stream

  return {
    getFullStream: () => fullStream,
    // getPartialStream: () => partialStream,
  };
};
