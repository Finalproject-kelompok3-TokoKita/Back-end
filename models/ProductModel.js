import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "Products",
  {
    idProducts: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    idCategories: DataTypes.STRING,
    idStore: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Products;

(async () => {
  await db.sync();
})();
