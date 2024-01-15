// utils/PasswordUtilities.js
const bcrypt = require("bcrypt");

const hash = async (plainPassword) => {
  console.log("Before hash: Plain password:", plainPassword);
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("After hash: Hashed password:", hashedPassword);
  return hashedPassword;
};

const compare = async (plainPassword, hashedPassword) => {
  console.log("Comparing passwords with bcrypt.compare:", plainPassword, hashedPassword);
  return await bcrypt.compare(plainPassword.trim(), hashedPassword.trim());
};

module.exports = {
  hash,
  compare,
};
