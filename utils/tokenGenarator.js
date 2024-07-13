module.exports = async (userId) => {
  const jwt = require("jsonwebtoken");
  const user = require("@models/users");
  const data = await user.dataForToken(userId);
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
};
