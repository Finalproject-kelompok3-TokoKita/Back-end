const { provinces, cities, users, store, categories, products, favorite, sequelize } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");
const { removePhoto } = require("../utils");

const dashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (userId) {
      const resultStore = await store.findAll({
        where: { userId },
        include: [provinces, cities, products, categories],
      });
      return res.status(200).json({
        message: "Succesfully",
        data: resultStore,
      });
    }
  } catch (err) {
    next(err);
  }
};
const check = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const resultStore = await store.findOne({
      where: { userId },
    });
    return res.status(200).json({
      message: "Succesfully",
      data: resultStore,
    });
  } catch (err) {
    next(err);
  }
};
const getStore = async (req, res, next) => {
  try {
    const resultStore = await store.findAll({
      attributes: ["id", "phone", "name", "address", "photo", "domain", "cityId", "provinceId", "categoryId"],
      include: [categories, provinces, cities],
    });

    return res.status(200).json({
      message: "Successfully",
      data: resultStore,
    });
  } catch (err) {
    next(err);
  }
};

const getStorebycity = async (req, res, next) => {
  try {
    const { id } = req.params;
    //const id = req.params.id;
    const resultstore = await store.findAll({
      where: {
        cityId: id,
      },
      include: [cities, provinces, categories]
    });

    if (!resultstore) {
      throw new DataNotFoundError('Kota yang anda cari tidak ditemukan!')
    }

    return res.status(200).json({
      message: 'Scucessfully',
      data: resultstore,
    })
  } catch (err) {
    next(err)
  }
}

const getMostLikedStores = async (req, res, next) => {
  try {
    const mostLikedStores = await store.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("COUNT", sequelize.col("favorites.id")), "likeCount"],
      ],
      include: [
        {
          model: favorite,
          attributes: [],
          duplicating: false,
        },
      ],
      group: ["store.id"],
      order: [[sequelize.literal("likeCount"), "DESC"]],
    });

    if (!mostLikedStores || mostLikedStores.length === 0) {
      throw new DataNotFoundError("No liked stores found");
    }

    return res.status(200).json({
      message: "Successfully",
      data: mostLikedStores,
    });
  } catch (err) {
    next(err);
  }
};
const getAll = async (req, res, next) => {
  try {
    const resultStore = await store.findAll();
    return res.status(200).json({
      message: "Succesfully",
      data: resultStore,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const resultStore = await store.findOne({
      where: {
        id: id,
      },
      include: [users, provinces, cities, products, categories],
    });

    return res.status(200).json({
      message: "Scucessfully",
      data: resultStore,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { phone, name, address, domain, cityId, provinceId, categoryId } = req.body;
    const photoFilename = req.file ? req.file.storedFilename : null;

    const province = await provinces.findOne({
      where: { id: provinceId },
    });

    if (!province) {
      throw new BadRequestError("Pastikan id provinsi valid");
    }

    const city = await cities.findOne({
      where: { id: cityId },
    });

    if (!city) {
      throw new BadRequestError("Pastikan id kota valid");
    }

    const storeCreated = await store.create({
      userId: req.user.id,
      phone,
      name,
      address,
      domain,
      cityId,
      provinceId,
      categoryId,
      photo: photoFilename,
    });

    if (!storeCreated) {
      throw new Error("Gagal membuat toko");
    }

    const Store = await store.findOne({
      where: { id: storeCreated.id },
      include: [users, provinces, cities],
    });

    if (!Store) {
      throw new Error("Toko tidak ditemukan setelah pembuatan");
    }

    return res.status(201).json({
      message: "Created",
      data: Store,
    });
  } catch (err) {
    if (req.file && req.file.storedFilename) {
      removePhoto("store", req.file.storedFilename);
    }

    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { phone, name, address, domain, cityId, provinceId, categoryId } = req.body;
    const photoFilename = req.file ? req.file.storedFilename : null;

    const city = await cities.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new BadRequestError("Pastikan id kota valid");
    }

    const province = await provinces.findOne({
      where: {
        id: provinceId,
      },
    });

    if (!province) {
      throw new BadRequestError("Pastikan id provinsi valid");
    }
    const category = await categories.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new BadRequestError("Pastikan category provinsi valid");
    }

    const resultStore = await store.findOne({
      where: {
        id: id,
      },
    });

    if (!resultStore) {
      throw new DataNotFoundError("Store tidak ditemukan");
    }

    const oldPhotoFilename = resultStore.photo;
    if (req.file) {
      resultStore.photo = photoFilename;
    }

    resultStore.userId = req.user.id;
    resultStore.phone = phone;
    resultStore.name = name;
    resultStore.address = address;
    resultStore.domain = domain;
    resultStore.cityId = cityId;
    resultStore.provinceId = provinceId;
    resultStore.categoryId = categoryId;
    resultStore.photo = photoFilename || resultStore.photo;

    const resultUpdatedStore = await resultStore.save();
    if (resultUpdatedStore && oldPhotoFilename && oldPhotoFilename !== photoFilename) {
      removePhoto("stores", oldPhotoFilename);
    }

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedStore,
    });
  } catch (err) {
    if (req.file && req.file.storedFilename) {
      removePhoto("stores", req.file.storedFilename);
    }
    next(err);
  }
};



const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultStore = await store.findOne({
      where: {
        id: id,
      },
    });

    if (!resultStore) {
      throw new DataNotFoundError("Toko tidak ditemukan");
    }
    const oldPhotoFilename = resultStore.photo;

    await resultStore.destroy();
    if (oldPhotoFilename) {
      removePhoto("stores", oldPhotoFilename);
    }

    return res.status(200).json({
      message: "Deleted",
      data: resultStore,
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
  dashboard,
  getStorebycity,
  getStore,
  check,
  getMostLikedStores,
};
