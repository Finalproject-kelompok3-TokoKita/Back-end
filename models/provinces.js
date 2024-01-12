"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class provinces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      provinces.hasMany(models.cities, { foreignKey: "provinceId" });

      provinces.hasOne(models.users);
      provinces.hasOne(models.store);
    }
  }
  provinces.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "provinces",
    }
  );
  return provinces;
};
