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

  const questionnaire = require("@models/questionnaire");

  try {
    const userQuestionnaire = await questionnaire.findById(userId);

    if (!userQuestionnaire) {
      return reply.status(404).send({ message: "Анкета не знайдена." });
    }

    return reply.status(200).send(userQuestionnaire);
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: "Помилка сервера." });
  }
}
