'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Stores', [
      {
        userId: 1,
        phone: "08101890",
        name: "pak haji",
        address: "jln.flamboyan",
        domain: "pakhaji",
        cityId: 1,
        provinceId: 2,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        phone: "081201890",
        name: "udin gonzes",
        address: "jln.kartini",
        domain: "udingonzes",
        cityId: 2,
        provinceId: 3,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        phone: "081201890",
        name: "gonzales sibak",
        address: "jln.kolam",
        domain: "gonzalessibak",
        cityId: 3,
        provinceId: 4,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        phone: "081280890",
        name: "sihaloho nuel",
        address: "jln.prapat",
        domain: "sihalohonuel",
        cityId: 4,
        provinceId: 5,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        phone: "089501890",
        name: "manuel martulang",
        address: "jln.jamin ginting",
        domain: "manuelmartulang",
        cityId: 5,
        provinceId: 6,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
