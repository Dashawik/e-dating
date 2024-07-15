const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async add(userId, message, link) {
    return await prisma.notifications.create({
      data: {
        userId,
        message,
        link,
      },
    });
  },
  async findById(userId) {
    return await prisma.notifications.findMany({
      where: {
        userId,
      },
      select: {
        message: true,
        link: true,
        createdAt: true,
      },
    });
  },
};
