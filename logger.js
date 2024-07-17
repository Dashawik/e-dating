const pino = require("pino");
const pinoPretty = require("pino-pretty");

const logger = pino(
  {
    level: "info",
  },
  pinoPretty({
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
  })
);

module.exports = logger;
