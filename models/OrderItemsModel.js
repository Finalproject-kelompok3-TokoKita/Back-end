import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Orders from "./OrdersModel.js";
import Products from "./ProductsModel.js";

const { DataTypes } = Sequelize;

const Items = db.define(
  "Items",
  {
    idItem: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: false,
    },
    idOrders: DataTypes.STRING,
    idProducts: DataTypes.STRING,
    quantity: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
Items.belongsTo(Orders, { foreignKey: "idOrders" });
Items.belongsTo(Products, { foreignKey: "idProducts" });
export default Items;

(async () => {
  await db.sync();
})();
