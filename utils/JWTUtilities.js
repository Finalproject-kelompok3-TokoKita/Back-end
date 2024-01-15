require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (payload, options) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
