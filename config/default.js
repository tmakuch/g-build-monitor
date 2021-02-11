module.exports = {
  basePath: "/api",
  port: process.env.APP_PORT | 3300,
  repo: {
    name: "tmakuch/g-build-monitor",
    token: require("./env/githubToken"),
  },
};
