import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Provinces from "./ProvincesModel.js";

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
Cities.belongsTo(Provinces, { foreignKey: "idProvinces" });

export default Cities;

(async () => {
  await db.sync();
})();
