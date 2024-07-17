const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async add(finderId, candidateId) {
    return await prisma.viewList.create({
      data: {
        finderId,
        candidateId,
      },
    });
  },

  async viewedCandidates(finderId) {
    return await prisma.viewList.findMany({
      where: {
        finderId,
      },
      select: {
        candidateId: true,
      },
    });
  },
};
