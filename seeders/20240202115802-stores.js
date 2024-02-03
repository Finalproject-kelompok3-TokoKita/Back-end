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
        name: "Restoran Padang Rancak Bana",
        address: "jln.flamboyJLN. BUKIT PUTUS - BTS. KOTA PADANG (PADANG)an",
        photo: "1.jpg",
        domain: "Rancak-Bana",
        cityId: 17,
        provinceId: 9,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        phone: "081201890",
        name: "Sate Padang Mak Tuo",
        address: "Jl. Wr. Supratman No.26, Ampalu, Pariaman Utara, Kota Pariaman",
        photo: "2.jpg",
        domain: "Sate-Padang",
        cityId: 18,
        provinceId: 9,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        phone: "081201890",
        name: "Nasi Goreng Viral",
        address: "jln.Menteng no 1",
        photo: "3.jpg",
        domain: "Nasgorviral",
        cityId: 4,
        provinceId: 2,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        phone: "081280890",
        name: "Kedai Kopi IbuKota",
        address: "jln.Koja no 10",
        photo: "4.jpg",
        domain: "Kopi-IbuKota",
        cityId: 3,
        provinceId: 2,
        categoryId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        phone: "089501890",
        name: "Soto Mie Pak John Doe",
        address: "jln.bogor no 20, bogor",
        photo: "5.jpg",
        domain: "Soto-Mie",
        cityId: 6,
        provinceId: 3,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        phone: "089501890",
        name: "Toko Kue Ibu sianida",
        address: "jln.semarang no 50, kota semarang",
        photo: "6.jpg",
        domain: "Toko-kue",
        cityId: 7,
        provinceId: 4,
        categoryId: 7,
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
