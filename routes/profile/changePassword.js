module.exports = (fastify, opts, next) => {
  fastify.post(
    "/changePassword",
    {
      preValidation: fastify.auth(),
      schema: {
        body: {
          type: "object",
          properties: {
            oldPassword: {
              type: "string",
              minLength: 8,
              errorMessage: {
                minLength: "Пароль має бути не менше 8 символів.",
              },
            },
            newPassword: {
              type: "string",
              minLength: 8,
              errorMessage: {
                minLength: "Пароль має бути не менше 8 символів.",
              },
            },
          },
          required: ["oldPassword", "newPassword"],
        },
      },
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const { oldPassword, newPassword } = request.body;

  const bcrypt = require("bcrypt");
  const validPassword = require("@utils/passwordValidator");
  const user = require("@models/users");

  const foundUser = await user.getPassword(request.user.id);

  const passwordIsValid = await bcrypt.compare(oldPassword, foundUser.password);

  if (!passwordIsValid) {
    return reply.status(401).send({ message: "Невірний пароль." });
  }

  const passwordValidation = validPassword(newPassword);

  if (!passwordValidation.status)
    return reply.status(400).send({ message: passwordValidation.msg });

  const hash = bcrypt.hashSync(newPassword, 10);

  try {
    await user.editPassword(request.user.id, hash);
    reply.status(201).send({ message: "Пароль змінено." });
  } catch (error) {
    return reply.status(500).send({ message: "Помилка зміни паролю." });
  }
}
