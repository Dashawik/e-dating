require("dotenv").config();
const path = require("node:path");

const fastify = require("fastify")();

fastify.get("/", async (request, reply) => {
  return reply.status(200).send({ message: "Hello World" });
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
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
