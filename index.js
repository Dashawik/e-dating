require("dotenv").config();
require("module-alias/register");
const path = require("node:path");

const logger = require("./logger");
const fastify = require("fastify")({
  logger,
  ajv: {
    customOptions: {
      jsonPointers: true,
      allErrors: true,
    },
    plugins: [require("ajv-errors")],
  },
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
});

fastify.register(require("@fastify/autoload"), {
  dir: path.join(__dirname, "routes"),
  options: { prefix: "/api" },
});

fastify.get("/", async (request, reply) => {
  return reply.sendFile("welcome.html");
});
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log(fastify.printPlugins());
    console.log(fastify.printRoutes());
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
