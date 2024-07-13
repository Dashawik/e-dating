module.exports = (fastify, opts, next) => {
  fastify.post(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            login: {
              type: "string",
              minLength: 2,
              errorMessage: {
                minLength: "Логін має бути не менше 2 символів.",
              },
            },
            password: {
              type: "string",
              minLength: 8,
              errorMessage: {
                minLength: "Пароль має бути не менше 8 символів.",
              },
            },
          },
          required: ["login", "password"],
        },
      },
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const { login, password } = request.body;

  const bcrypt = require("bcrypt");
  const validPassword = require("@utils/passwordValidator");
  const user = require("@models/users");

  const passwordValidation = validPassword(password);

  if (!passwordValidation.status)
    return reply.status(400).send({ message: passwordValidation.msg });

  const hash = bcrypt.hashSync(password, 10);

  try {
    await user.create(login, hash);
    reply.status(201).send({ message: "Користувача створено." });
  } catch (error) {
    if (error.code === "P2002") {
      return reply
        .status(400)
        .send({ message: "Користувач з такими даними вже існує." });
    }
    return reply
      .status(500)
      .send({ message: "Помилка створення користувача." });
  }
}
