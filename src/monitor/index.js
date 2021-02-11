const { shareReplay } = require("rxjs/operators");
const { combineLatest } = require("rxjs");
const plugins = require("./plugins");
const { map } = require("rxjs/operators");

module.exports = {
  init: (fastify, config, webhookStream) => {
    const pipes = Object.keys(config).reduce(
      (result, pluginName) => {
        const plugin = plugins.resolve(pluginName)(
          fastify,
          config[pluginName],
          webhookStream,
        );

        result.fulls.push(
          plugin
            .getFullStream()
            .pipe(map((value) => ({ [pluginName]: value }))),
        );
        // result.partials.push(plugin.getPartialStream());

        return result;
      },
      {
        fulls: [],
        partials: [],
      },
    );

    const dataStream = combineLatest(...pipes.fulls).pipe(
      map((fullValues) => {
        return Object.assign({}, ...fullValues);
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
    );

    return {
      getStream: () => dataStream,
    };
  },
};
