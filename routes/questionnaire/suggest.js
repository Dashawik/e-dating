module.exports = (fastify, opts, next) => {
  fastify.post(
    "/suggest",
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
  const viewList = require("@models/viewList");
  try {
    const { searchGender } = await questionnaire.findById(userId);

    const viewedCandidates = await viewList.viewedCandidates(userId);
    const viewedCandidateIds = viewedCandidates.map((vc) => vc.candidateId);
    viewedCandidateIds.push(userId);

    const unviewedQuestionnaires = await questionnaire.unviewedQuestionnaires(
      viewedCandidateIds,
      searchGender
    );

    if (unviewedQuestionnaires.length === 0) {
      return reply.status(404).send({ message: "Немає підходящих анкет." });
    }

    const randomIndex = Math.floor(
      Math.random() * unviewedQuestionnaires.length
    );
    const randomQuestionnaire = unviewedQuestionnaires[randomIndex];

    return reply.status(200).send(randomQuestionnaire);
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: "Помилка сервера." });
  }
}
