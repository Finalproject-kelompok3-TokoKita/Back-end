import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Provinces = db.define(
  "Provinces",
  {
    idProvinces: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: false,
    },
    nama: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Provinces;

(async () => {
  await db.sync();
})();
