'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders_items.init({
    orderId: DataTypes.NUMBER,
    productId: DataTypes.NUMBER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders_items',
  });
  return orders_items;
};