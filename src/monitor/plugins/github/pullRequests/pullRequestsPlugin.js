const { Observable } = require("rxjs");
const pullPRs = require("./makePRRequest");
const { map } = require("rxjs/operators");
const { isThisPRWebhook, mapWebhook } = require("./webhookUtils");
const { filter } = require("rxjs/operators");
const reducePRPullDataToDict = require("./reducePRPullDataToDict");

module.exports = (fastify, config, webhookStream) => {
  const fullStream = new Observable(async (subscriber) => {
    try {
      fastify.log.info("Github PRs - pulling");
      const pull = await pullPRs(config.name, config.token);

      fastify.log.info("Github PRs - pulling successful");
      subscriber.next(pull.data.reduce(reducePRPullDataToDict, {}));
    } catch (err) {
      fastify.log.error(`Github PRs - error while pulling: `, err.message);
      fastify.log.verbose(err);
      subscriber.error(err);
    }
  });
  const partialStream = webhookStream.pipe(
    filter((webhook) => isThisPRWebhook(fastify, webhook, config)),
    map((webhook) => mapWebhook(fastify, webhook)),
  );

  return {
    getFullStream: () => fullStream,
    getPartialStream: () => partialStream,
  };
};
