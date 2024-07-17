module.exports = (fastify, opts, next) => {
  fastify.post(
    "/add",
    {
      preValidation: fastify.auth(),
      schema: {
        body: {
          type: "object",
          properties: {
            candidateId: {
              type: "integer",
              minimum: 0,
              errorMessage: {
                minimum: "ID має бути не менше 0.",
              },
            },
          },
          required: ["candidateId"],
        },
      },
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const { candidateId } = request.body;
  const { id: finderId } = request.user;

  const viewList = require("@models/viewList");

  try {
    console.log(finderId, candidateId);
    await viewList.add(finderId, candidateId);
    reply.code(201).send("Анкету додано до списку перегляду.");
  } catch (error) {
    console.log(error);
    reply.code(500).send("Помилка сервера.");
  }
}
