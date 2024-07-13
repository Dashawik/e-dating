const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(login, password) {
    return await prisma.users.create({
      data: {
        login,
        password,
      },
    });
  },

  async findByLogin(login) {
    return await prisma.users.findUnique({
      where: {
        login,
      },
      select: {
        id: true,
        login: true,
        password: true,
      },
    });
  },

  async dataForToken(id) {
    return await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        login: true,
      },
    });
  },
};
