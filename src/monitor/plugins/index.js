const plugins = {
  "github-pulls": require("./github/pullRequests"),
};

module.exports = {
  resolve: (pluginName) => {
    if (!plugins[pluginName]) {
      throw new Error("Invalid plugin name: " + JSON.stringify(pluginName));
    }

    return plugins[pluginName];
  },
};
