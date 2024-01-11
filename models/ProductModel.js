import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Categories from "./CategoriesModel.js";
import Store from "./StoreModel.js";

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
Products.belongsTo(Categories, { foreignKey: "idCategories" });
Products.belongsTo(Store, { foreignKey: "idStore" });
export default Products;

(async () => {
  await db.sync();
})();
