const { shareReplay } = require("rxjs/operators");
const { Observable } = require("rxjs");
const plugins = require("./plugins");

module.exports = {
  init: (config) => {
    const dataStream = new Observable((subscriber) => {
      let tick = 0;
      subscriber.next({ tick: tick, first: true, time: Date.now() });
      const pid = setInterval(() => {
        subscriber.next({ tick: ++tick, time: Date.now() });
      }, 5000);

      return () => {
        clearInterval(pid);
      };
    }).pipe(
      shareReplay({
        bufferSize: 1,
      }),
    );

    return {
      getStream: () => dataStream,
    };
  },
};
