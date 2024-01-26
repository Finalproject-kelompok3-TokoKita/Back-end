"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.categories);
      products.belongsTo(models.store);
      products.hasMany(models.order_items);
      products.hasMany(models.cart);
    }
  }
  products.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.NUMBER,
      quantity: DataTypes.NUMBER,
      photo: DataTypes.STRING,
      categoryId: DataTypes.NUMBER,
      storeId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
