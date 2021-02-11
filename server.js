const fastify = require("fastify")({ logger: { prettyPrint: true } });
const config = require("./config");

fastify.register(require("fastify-formbody"));

fastify.register(require("./src"), { prefix: config.basePath });

fastify.register(require("fastify-static"), {
  root: require("path").join(__dirname, "/dist"),
  prefix: "/",
  wildcard: "/**",
});
fastify.setNotFoundHandler((req, res) => res.sendFile("index.html"));

(async () => {
  try {
    await fastify.listen(config.port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
