import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Store = db.define(
  "store",
  {
    idStore: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: false,
    },
    idUser: DataTypes.STRING,
    phone: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    domain: DataTypes.STRING,
    idCities: DataTypes.STRING,
    idProvinces: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Store;

(async () => {
  await db.sync();
})();
