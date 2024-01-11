import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Provinces from "./ProvincesModel.js";
import Cities from "./CitiesModel.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "User",
  {
    idUser: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: false,
    },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    DateOfBirth: DataTypes.STRING,
    address: DataTypes.STRING,
    idCities: DataTypes.STRING,
    idProvinces: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
User.belongsTo(Provinces, { foreignKey: "idProvinces" });
User.belongsTo(Cities, { foreignKey: "idCities" });

export default User;

(async () => {
  await db.sync();
})();
