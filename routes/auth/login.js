module.exports = (fastify, opts, next) => {
  fastify.post(
    "/login",
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
  const bcrypt = require("bcrypt");
  const tokenGenarator = require("@utils/tokenGenarator");

  const user = require("@models/users");
  const token = require("@models/tokens");
  const questionnaire = require("@models/questionnaire");

  const { login, password } = request.body;

  const foundUser = await user.findByLogin(login);

  if (!foundUser) {
    return reply
      .status(404)
      .send({ message: "Користувача з таким логіном не знайдено." });
  }

  const passwordIsValid = await bcrypt.compare(password, foundUser.password);

  if (!passwordIsValid) {
    return reply.status(401).send({ message: "Невірний пароль." });
  }

  const accessToken = await tokenGenarator(foundUser.id);
  await token.upsert(foundUser.id, accessToken);

  let data = {
    id: foundUser.id,
    login: foundUser.login,
    firstLogin: foundUser.firstLogin,
    role: foundUser.role,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    accessToken: `Bearer ${accessToken}`,
  };

  const userQuestionnaire = await questionnaire.findById(foundUser.id);

  if (!userQuestionnaire) data.redirect = "/questionnaire.html";
  else data.redirect = "/home.html";

  return reply.status(200).send(data);
}
