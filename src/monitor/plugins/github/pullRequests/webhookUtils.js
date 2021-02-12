module.exports = {
  //TODO
  isThisPRWebhook: (fastify, webhook, config) =>
    webhook?.headers["x-github-event"] === "pull_request" && //TODO support reviewers
    webhook?.body?.repository?.full_name === config.name,
  mapWebhook: (fastify, webhook) => webhook?.body,
};
