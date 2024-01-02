const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_kel3", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
