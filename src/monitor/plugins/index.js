const plugins = {
  "github-pulls": require("./github/pullRequests"),
};

return {
  resolve: (pluginConfig) => {
    if (!plugins[pluginConfig.name]) {
      throw new Error(
        "Invalid plugin configuration: " + JSON.stringify(pluginConfig),
      );
    }

    return plugins[pluginConfig.name](pluginConfig);
  },
};
