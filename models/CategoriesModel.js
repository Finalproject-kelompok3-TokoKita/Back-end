import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Categories = db.define(
  "Categories",
  {
    idCategories: {
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

export default Categories;

(async () => {
  await db.sync();
})();
