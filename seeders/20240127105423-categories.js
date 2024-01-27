"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Restoran",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Home Industry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Street Food",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Makanan Tradisional",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Angkringan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cafe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Roti dan Kue",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Home Catering",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
