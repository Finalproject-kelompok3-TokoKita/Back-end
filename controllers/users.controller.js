const { provinces, cities, users } = require("../models");
const { removePhoto } = require("../utils");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const resultUsers = await users.findAll({
      include: [store, provinces, cities],
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
    const decodedToken = req.user;
    if (!decodedToken || !decodedToken.id) {
      throw new DataNotFoundError("Token tidak valid");
    }

    const userId = decodedToken.id;

    const resultUser = await users.findOne({
      where: {
        id: userId,
      },
    });

    if (!resultUser) {
      throw new DataNotFoundError("User tidak ditemukan");
    }

    return res.status(200).json({
      message: "Berhasil",
      data: resultUser,
    });
  } catch (err) {
    next(err);
  }
};

const getByID = async (req, res, next) => {
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
    const photoFilename = req.file ? req.file.storedFilename : null;

    // if (!fullName || !email || !phone || !password || !dateOfBirth || !address || !cityId || !provinceId || !gender) {
    //   throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    // }

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
      photo: photoFilename,
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
    if (req.file && req.file.storedFilename) {
      removePhoto("users", req.file.storedFilename);
    }
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, dateOfBirth, gender, email, phone, address, cityId, provinceId } = req.body;
    const photoFilename = req.file ? req.file.storedFilename : null;

    // if (!fullName || !email || !phone || !cityId || !provinceId) {
    //   throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    // }


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
    const oldPhotoFilename = resultUsers.photo;
    resultUsers.fullName = fullName;
    resultUsers.dateOfBirth = dateOfBirth;
    resultUsers.gender = gender;
    resultUsers.email = email;
    resultUsers.phone = phone;
    resultUsers.address = address;
    resultUsers.cityId = cityId;
    resultUsers.provinceId = provinceId;
    resultUsers.photo = photoFilename || resultUsers.photo;

    const resultUpdatedUsers = await resultUsers.save();
    if (resultUpdatedUsers && oldPhotoFilename && oldPhotoFilename !== photoFilename) {
     removePhoto("users", oldPhotoFilename);
   }
    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedUsers,
    });
  } catch (err) {
    removePhoto("users", req.file.storedFilename);
    if (req.file && req.file.storedFilename) {
      removePhoto("users", req.file.storedFilename);
    }
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
    const oldPhotoFilename = resultUsers.photo;


    await resultUsers.destroy();
    if (oldPhotoFilename) {
      removePhoto("stores", oldPhotoFilename);
    }

    return res.status(200).json({
      message: "Deleted",
      data: resultUsers,
    });
  } catch (err) {
    next(err);
  }
};

const uploadFile = async (req, res, next) => {
  try {
    console.log(req.fileMetadata, req.file);
    res.status(200).json({
      message: "Berhasil Upload!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  getByID,
  createOne,
  updateOne,
  deleteOne,
  uploadFile,
};
