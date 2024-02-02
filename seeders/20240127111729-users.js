"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashpass = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert('Users', [
      {
        fullName: "ucok",
        email: "ucok@gmail.com",
        phone: "081810888",
        password: hashpass,
        address: "langkat",
        cityId: 5,
        provinceId: 1,
        gender: "laki-laki",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "udin",
        email: "udin@gmail.com",
        phone: "0812909098",
        password: hashpass,
        address: "securai",
        cityId: 6,
        provinceId: 2,
        gender: "laki-laki",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "milea",
        email: "milea@gmail.com",
        phone: "0812898080",
        password: hashpass,
        address: "buah batu",
        cityId: 4,
        provinceId: 8,
        gender: "perempuan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "denise",
        email: "denise@gmail.com",
        phone: "08950909",
        password: hashpass,
        address: "secanggang",
        cityId: 8,
        provinceId: 4,
        gender: "perempuan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "jokowi",
        email: "jokowi@gmail.com",
        phone: "0812456788",
        password: hashpass,
        address: "dewantara",
        cityId: 3,
        provinceId: 2,
        gender: "laki-laki",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
