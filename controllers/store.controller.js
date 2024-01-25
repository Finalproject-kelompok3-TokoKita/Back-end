const { provinces, cities, users, store, categories } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

// const getAl = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     if (userId) {
//       const resultStore = await store.findAll({
//         where: { userId },
//         include: [provinces, cities],
//       });
//       return res.status(200).json({
//         message: "Succesfully",
//         data: resultStore,
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

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

const dashboard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    if (userId) {
      const resultStore = await store.findOne({
        where: {
          id: id,
        },
        include: [users, provinces, cities],
      });

      if (!resultStore) {
        throw new DataNotFoundError("Toko tidak ditemukan");
      }

      return res.status(200).json({
        message: "Scucessfully",
        data: resultStore,
      });
    }
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
      include: [users, provinces, cities, categories],
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
    const { phone, name, address, domain, cityId, provinceId, categotyId } = req.body;

    // if (!phone || !name || !address || !domain || !cityId || !provinceId) {
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
    const category = await provinces.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new BadRequestError("Pastikan id category valid");
    }

    const storeCreated = await store.create({
      userId: req.user.id,
      phone,
      name,
      address,
      domain,
      cityId,
      provinceId,
      categotyId,
    });

    const Store = await store.findOne({
      where: {
        id: storeCreated.id,
      },
      include: [users, provinces, cities, categories],
    });

    return res.status(201).json({
      message: "Created",
      data: Store,
    });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { phone, name, address, domain, cityId, provinceId, categoryId } = req.body;

    // if (!phone || !name || !address || !domain || !cityId || !provinceId) {
    //   throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    // }

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
    const category = await provinces.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new BadRequestError("Pastikan id category valid");
    }

    const resultStore = await store.findOne({
      where: {
        id: id,
      },
    });

    if (!resultStore) {
      throw new DataNotFoundError("Store tidak ditemukan");
    }

    resultStore.userId = req.user.id;
    resultStore.phone = phone;
    resultStore.name = name;
    resultStore.address = address;
    resultStore.domain = domain;
    resultStore.cityId = cityId;
    resultStore.provinceId = provinceId;
    resultStore.categoryId = categoryId;
    const resultUpdatedStore = await resultStore.save();

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedStore,
    });
  } catch (err) {
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

    await resultStore.destroy();

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
};
