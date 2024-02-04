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
    await queryInterface.bulkInsert('products', [
      {
        name: "Paket Nasi Rendang",
        description: "Nasi + Rendang + sayur singkong + sayur kapau + Sambal Hijau",
        price: "20000",
        quantity: "30",
        photo: "1.jpg",
        storeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Paket Nasi Dendeng Balado",
        description: "Nasi + Dendeng balado + sayur singkong + sayur kapau + Sambal Hijau",
        price: "25000",
        quantity: "30",
        photo: "2.jpg",
        storeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ikan Bilih",
        description: "Ikan Bilih khas danau singkarak",
        price: "25000",
        quantity: "50",
        photo: "3.jpg",
        storeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sate Padang khas pariaman",
        description: "Sate padang 15 tusuk + Nasi / ketupat",
        price: "25000",
        quantity: "40",
        photo: "4.jpg",
        storeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Soto Padang Pariaman",
        description: "Soto padang + Nasi",
        price: "25000",
        quantity: "50",
        photo: "5.jpg",
        storeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nasi Goreng paket komplit viral banget",
        description: "Nasi goreng, telur, ayam suwir, bakso, timun, tomat",
        price: "30000",
        quantity: "50",
        photo: "6.jpg",
        storeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mie Goreng paket komplit viral banget",
        description: "Mie goreng, telur, ayam suwir, bakso, timun, tomat",
        price: "28000",
        quantity: "30",
        photo: "7.jpg",
        storeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bihun Goreng aja tapi tetap viral",
        description: "Bihun goreng, telur",
        price: "25000",
        quantity: "50",
        photo: "8.jpg",
        storeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Black Coffee",
        description: "Robusta Black Coffee",
        price: "30000",
        quantity: "35",
        photo: "9.jpg",
        storeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Coffee Latte",
        description: "Robusta coffee latte",
        price: "40000",
        quantity: "20",
        photo: "10.jpg",
        storeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vietamese Coffee",
        description: "Kopi Vietnam",
        price: "38000",
        quantity: "50",
        photo: "11.jpg",
        storeId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },      
      {
        name: "Soto Daging komplit",
        description: "Soto daging + kikil + Nasi + minuman",
        price: "30000",
        quantity: "20",
        photo: "12.jpg",
        storeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Soto Mie Khas Bogor",
        description: "Soto mie + Nasi + Minuman",
        price: "25000",
        quantity: "50",
        photo: "13.jpg",
        storeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kue Tart",
        description: "Kue Tart",
        price: "85000",
        quantity: "20",
        photo: "14.jpg",
        storeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kue Bolu",
        description: "Bolu lapis",
        price: "28000",
        quantity: "50",
        photo: "15.jpg",
        storeId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Aneka Jajanan Psar",
        description: "jajanan pasar, kue kue, gorengan",
        price: "10000",
        quantity: "60",
        photo: "16.jpg",
        storeId: 6,
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
