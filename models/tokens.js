const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async upsert(userId, token) {
    return await prisma.tokens.upsert({
      where: {
        userId,
      },
      update: {
        token,
      },
      create: {
        token,
        userId,
      },
    });
  },
};
