module.exports = (fastify, opts, next) => {
  fastify.post(
    "/add",
    {
      preValidation: fastify.auth(),
      schema: {
        body: {
          type: "object",
          properties: {
            secondUserId: {
              type: "integer",
              minimum: 0,
              errorMessage: {
                minimum: "ID має бути не менше 0.",
              },
            },
          },
          required: ["secondUserId"],
        },
      },
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const { id: firstUserId } = request.user;
  const { secondUserId } = request.body;

  const matches = require("@models/matches");
  const notifications = require("@models/notifications");
  try {
    const match = await matches.add(firstUserId, secondUserId);
    await notifications.add(
      secondUserId,
      "Твоя анкета комусь сподобалась",
      "/matchViewer.html?id=" + match.id
    );
    reply.code(201).send("Збіг створено.");
  } catch (error) {
    console.log(error);
    reply.code(500).send("Помилка сервера.");
  }
}
