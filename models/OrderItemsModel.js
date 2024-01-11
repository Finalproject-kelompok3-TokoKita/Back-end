import { Sequelize } from "sequelize";
import db from "../config/database.js";

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

export default Items;

(async () => {
  await db.sync();
})();
