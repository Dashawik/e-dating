module.exports = (fastify, opts, next) => {
  fastify.get(
    "/",
    {
      preValidation: fastify.auth(),
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const { id: userId } = request.user;

  const notification = require("@models/notifications");

  try {
    const userNotification = await notification.findById(userId);

    if (!userNotification) {
      return reply.status(404).send({ message: "Сповіщення не знайдено." });
    }

    return reply.status(200).send(userNotification);
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: "Помилка сервера." });
  }
}
