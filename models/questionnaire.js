const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async upsert(
    userId,
    name,
    link,
    city,
    age,
    gender,
    searchGender,
    bio,
    profilePic
  ) {
    return await prisma.questionnaires.upsert({
      where: {
        userId,
      },
      update: {
        name,
        link,
        city,
        age,
        gender,
        searchGender,
        bio,
        profilePic,
      },
      create: {
        userId,
        name,
        link,
        city,
        age,
        gender,
        searchGender,
        bio,
        profilePic,
      },
    });
  },

  async findById(userId) {
    return await prisma.questionnaires.findUnique({
      where: {
        userId,
      },
    });
  },

  async unviewedQuestionnaires(viewedCandidateIds, gender) {
    return await prisma.questionnaires.findMany({
      where: {
        userId: {
          notIn: viewedCandidateIds,
        },
        gender,
      },
    });
  },
};
