"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
      },
      domain: {
        type: Sequelize.STRING,
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "cities",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      provinceId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "provinces",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stores");
  },
};
