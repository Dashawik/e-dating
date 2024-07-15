module.exports = (fastify, opts, next) => {
  fastify.post(
    "/get",
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
  const { id } = request.body;
  const { id: userId } = request.user;

  const matches = require("@models/matches");
  const questionnaire = require("@models/questionnaire");

  try {
    const match = await matches.get(id);

    let candidateId;
    if (userId == match.firstUserId) candidateId = match.secondUserId;
    else if (userId == match.secondUserId) candidateId = match.firstUserId;
    else return reply.code(404).send("Матч не знайдено.");

    const questionnaireData = await questionnaire.findById(candidateId);

    let data = {
      matchId: match.id,
      userId: questionnaireData.userId,
      name: questionnaireData.name,
      age: questionnaireData.age,
      city: questionnaireData.city,
      bio: questionnaireData.bio,
      profilePic: questionnaireData.profilePic,
    };

    if (match.confirmed) data.link = questionnaireData.link;

    return reply.status(200).send(data);
  } catch (error) {
    console.log(error);
    reply.code(500).send("Помилка сервера.");
  }
}
