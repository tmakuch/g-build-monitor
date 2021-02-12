const { share, shareReplay, map } = require("rxjs/operators");
const { combineLatest, merge } = require("rxjs");
const plugins = require("./plugins/pluginsResolver");

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
        result.partials.push(
          plugin
            .getPartialStream()
            .pipe(map((value) => ({ [pluginName]: value }))),
        );

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

    const partialsStream = merge(...pipes.partials).pipe(share());

    return {
      getFullStream: () => dataStream,
      getPartialStream: () => partialsStream,
    };
  },
};
