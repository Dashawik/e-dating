module.exports = (fastify, opts, next) => {
  fastify.post(
    "/confirm",
    {
      preValidation: fastify.auth(),
      schema: {
        body: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              minimum: 0,
              errorMessage: {
                minimum: "ID анкети має бути не менше 0.",
              },
            },
          },
          required: ["id"],
        },
      },
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const { id: requestedUser } = request.user;
  const { id: matchId } = request.body;

  const matches = require("@models/matches");
  const notifications = require("@models/notifications");

  try {
    const match = await matches.get(matchId);
    if (match.secondUserId != requestedUser) {
      reply.code(403).send({ message: "Немає доступу до цієї анкети." });
      return;
    }
    await matches.confirm(matchId);
    await notifications.add(
      match.firstUserId,
      "Тобі відповіли взаємністю!",
      "/matchViewer.html?id=" + match.id
    );
    reply.code(200).send({ message: "Match confirmed." });
  } catch (error) {
    reply.code(400).send({ message: error.message });
  }
}
