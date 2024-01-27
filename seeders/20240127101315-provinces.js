"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Provinces", [
      {
        name: "Banten",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "DKI Jakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jawa Barat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jawa Tengah",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jawa Timur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Daerah Istimewa Yogyakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nanggroe Aceh Darussalam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sumatera Utara",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sumatera Barat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sumatera Selatan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Provinces", null, {});
  },
};
