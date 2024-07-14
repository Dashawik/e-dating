module.exports = (fastify, opts, next) => {
  fastify.post(
    "/questionnaire/upsert",
    {
      preValidation: fastify.auth(),
      schema: {
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 2,
              errorMessage: {
                minLength: "Ім'я має бути не менше 2 символів.",
              },
            },
            link: {
              type: "string",
              minLength: 2,
              errorMessage: {
                minLength: "Посилання має бути не менше 2 символів.",
              },
            },
            city: {
              type: "string",
              minLength: 2,
              errorMessage: {
                minLength: "Місто має бути не менше 2 символів.",
              },
            },
            age: {
              type: "number",
              minimum: 14,
              errorMessage: {
                minimum: "Вік має бути не менше 14 років.",
              },
            },
            gender: {
              type: "string",
              minLength: 4,
              errorMessage: {
                minLength: "Стать має бути не менше 4 символів.",
              },
            },
            searchGender: {
              type: "string",
              minLength: 4,
              errorMessage: {
                minLength: "Стать має бути не менше 4 символів.",
              },
            },
            bio: {
              type: "string",
              minLength: 2,
              errorMessage: {
                minLength: "Біографія має бути не менше 2 символів.",
              },
            },
            profilePic: {
              type: "string",
              minLength: 2,
              errorMessage: {
                minLength: "Посилання на аватар має бути не менше 2 символів.",
              },
            },
          },
          required: [
            "name",
            "link",
            "city",
            "age",
            "gender",
            "searchGender",
            "bio",
            "profilePic",
          ],
        },
      },
    },
    handler
  );

  next();
};

async function handler(request, reply) {
  const questionnaire = require("@models/questionnaire");

  console.log(request.body);
  console.log("User ID: ", request.user.id);

  try {
    await questionnaire.upsert(
      request.user.id,
      request.body.name,
      request.body.link,
      request.body.city,
      request.body.age,
      request.body.gender,
      request.body.searchGender,
      request.body.bio,
      request.body.profilePic
    );
    reply.status(201).send({ message: "Анкету збережено." });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "Помилка сервера." });
  }
}
