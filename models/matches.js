const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async add(firstUserId, secondUserId) {
    return await prisma.matches.create({
      data: {
        firstUserId,
        secondUserId,
      },
      select: {
        id: true,
      },
    });
  },

  async get(id) {
    return await prisma.matches.findUnique({
      where: {
        id,
      },
    });
  },
  async confirm(id) {
    return await prisma.matches.update({
      where: {
        id,
      },
      data: {
        confirmed: true,
      },
    });
  },
};
