"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      store.belongsTo(models.provinces);
      store.belongsTo(models.cities);
      store.belongsTo(models.users);
      store.hasMany(models.products);
    }
  }
  store.init(
    {
      userId: DataTypes.NUMBER,
      phone: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      photo: DataTypes.STRING,
      domain: DataTypes.STRING,
      cityId: DataTypes.NUMBER,
      provinceId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "store",
    }
  );
  return store;
};
