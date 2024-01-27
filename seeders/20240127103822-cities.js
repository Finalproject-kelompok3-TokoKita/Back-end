"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cities", [
      {
        provinceId: 1,
        name: "Tangerang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 1,
        name: "Cilegon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 2,
        name: "Jakarta Utara",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 2,
        name: "Jakarta Selatan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 3,
        name: "Bandung",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 3,
        name: "Bogor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 4,
        name: "Semarang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 4,
        name: "Surakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 5,
        name: "Surabaya",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 5,
        name: "Malang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 6,
        name: "Yogyakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 6,
        name: "Sleman",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 7,
        name: "Banda Aceh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 7,
        name: "Lhokseumawe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 8,
        name: "Medan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 8,
        name: "Binjai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 9,
        name: "Padang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 9,
        name: "Pariaman",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 10,
        name: "Palembang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provinceId: 10,
        name: "Pagaralam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cities", null, {});
  },
};
