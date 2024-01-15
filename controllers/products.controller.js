const { categories, cities, users } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const resultProducts = await users.findAll({
      include: [provinces, cities],
    });
    return res.status(200).json({
      message: "Succesfully",
      data: resultUsers,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultUsers = await users.findOne({
      where: {
        id: id,
      },
      include: [provinces, cities],
    });

    if (!resultUsers) {
      throw new DataNotFoundError("User tidak ditemukan");
    }

    return res.status(200).json({
      message: "Scucessfully",
      data: resultUsers,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { fullName, email, phone, password, dateOfBirth, address, cityId, provinceId, gender } = req.body;

    if (!fullName || !email || !phone || !password || !dateOfBirth || !address || !cityId || !provinceId || !gender) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const province = await provinces.findOne({
      where: {
        id: provinceId,
      },
    });

    if (!province) {
      throw new BadRequestError("Pastikan id provinsi valid");
    }

    const city = await cities.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new BadRequestError("Pastikan id provinsi valid");
    }

    const userCreated = await users.create({
      fullName,
      email,
      phone,
      password,
      dateOfBirth,
      address,
      cityId,
      provinceId,
      gender,
    });

    const user = await users.findOne({
      where: {
        id: userCreated.id,
      },
      include: [provinces, cities],
    });

    return res.status(201).json({
      message: "Created",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, password, dateOfBirth, address, cityId, provinceId, gender } = req.body;

    if (!fullName || !email || !phone || !cityId || !provinceId) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const resultUsers = await users.findOne({
      where: {
        id: id,
      },
    });

    if (!resultUsers) {
      throw new DataNotFoundError("User tidak ditemukan");
    }

    const province = await provinces.findOne({
      where: {
        id: provinceId,
      },
    });

    if (!province) {
      throw new BadRequestError("Pastikan id provinsi valid");
    }

    const city = await cities.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new BadRequestError("Pastikan id provinsi valid");
    }

    resultUsers.fullName = fullName;
    resultUsers.email = email;
    resultUsers.phone = phone;
    resultUsers.password = password;
    resultUsers.dateOfBirth = dateOfBirth;
    resultUsers.address = address;
    resultUsers.cityId = cityId;
    resultUsers.provinceId = provinceId;
    resultUsers.gender = gender;
    const resultUpdatedUsers = await resultUsers.save();

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedUsers,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultUsers = await users.findOne({
      where: {
        id: id,
      },
    });

    if (!resultUsers) {
      throw new DataNotFoundError("User tidak ditemukan");
    }

    await resultUsers.destroy();

    return res.status(200).json({
      message: "Updated",
      data: resultUsers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
