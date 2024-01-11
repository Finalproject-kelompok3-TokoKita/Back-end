import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Cities = db.define(
  "Cities",
  {
    idCities: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: false,
    },
    idProvinces: DataTypes.STRING,
    nama: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Cities;

(async () => {
  await db.sync();
})();
