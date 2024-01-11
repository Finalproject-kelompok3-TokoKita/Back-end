import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define(
  "Orders",
  {
    idOrders: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: false,
    },
    idUser: DataTypes.STRING,
    payment: DataTypes.STRING,
    status: DataTypes.STRING,
    json: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
Orders.belongsTo(User, { foreignKey: "idUser" });
export default Orders;

(async () => {
  await db.sync();
})();
