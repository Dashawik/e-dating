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

  async delete(id) {
    return await prisma.users.delete({
      where: {
        id,
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

  async getPassword(id) {
    return await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        password: true,
      },
    });
  },

  async editPassword(id, password) {
    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
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
