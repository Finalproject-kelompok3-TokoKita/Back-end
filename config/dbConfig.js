const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("your-database-name", "your-username", "your-password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
