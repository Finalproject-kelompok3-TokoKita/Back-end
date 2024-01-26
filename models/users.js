"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.provinces);
      users.belongsTo(models.cities);
      users.hasOne(models.store);
      users.hasMany(models.orders);
      users.hasMany(models.favorite);
    }
  }
  users.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      address: DataTypes.STRING,
      cityId: DataTypes.NUMBER,
      provinceId: DataTypes.NUMBER,
      gender: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
