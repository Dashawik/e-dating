const jwt = require("jsonwebtoken");

module.exports = function (fastify) {
  fastify.decorate("auth", () => {
    return (request, reply, done) => {
      try {
        const token = request.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        done();
      } catch (error) {
        return reply.status(401).send({ message: "Помилка авторизації." });
      }
    };
  });
};
