module.exports = (fastify, opts, next) => {
  fastify.delete(
    "/",
    {
      preValidation: fastify.auth(),
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const user = require("@models/users");

  try {
    await user.delete(request.user.id);
    reply.status(200).send({ message: "Профіль видалено." });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "Помилка сервера." });
  }
}
