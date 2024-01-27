const { store, products } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

// const getAll = async (req, res, next) => {
//   try {
//     const storeId = req.store.id;
//     if (storeId) {
//       const resultProducts = await products.findAll({
//         where: { storeId },
//         include: [store],
//       });
//       return res.status(200).json({
//         message: "Succesfully",
//         data: resultProducts,
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const getAll = async (req, res, next) => {
  try {
    const id = req.user;
    const resultProducts = await products.findAll({
      include: [store],
    });
    return res.status(200).json({
      message: "Succesfully",
      data: id,
    });
  } catch (err) {
    next(err);
  }
};

const getOneDashboard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resultProducts = await products.findOne({
      where: {
        id: id,
      },
      include: [store],
    });

    if (!resultProducts) {
      throw new DataNotFoundError("Product tidak ditemukan");
    }

    return res.status(200).json({
      message: "Scucessfully",
      data: resultProducts,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultProducts = await products.findOne({
      where: {
        id: id,
      },
      include: [store],
    });

    if (!resultProducts) {
      throw new DataNotFoundError("Product tidak ditemukan");
    }

    return res.status(200).json({
      message: "Scucessfully",
      data: id,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const userId = req.user.id;
    const file = req.file;

    const userStore = await store.findOne({
      where: {
        userId,
      },
    });

    if (!userStore) {
      throw new BadRequestError("Kamu tidak memiliki toko!");
    }

    const productCreated = await products.create({
      name,
      description,
      price,
      quantity,
      storeId: userStore.id,
      photo: file ? file.storedFilename : null,
    });

    const Products = await products.findOne({
      where: {
        id: productCreated.id,
      },
      include: [store],
    });

    return res.status(201).json({
      message: "Berhasil Dibuat",
      data: Products,
    });
  } catch (err) {
    removePhoto("users", req.file.storedFilename);
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const { name, description, price, quantity, storeId } = req.body;

    if (!name || !description || !price || !quantity || !storeId) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const resultProducts = await products.findOne({
      where: {
        id: id,
      },
    });

    if (!resultProducts) {
      throw new DataNotFoundError("Product tidak ditemukan");
    }

    const Store = await store.findOne({
      where: {
        id: storeId,
      },
    });

    if (!Store) {
      throw new BadRequestError("Pastikan id store valid");
    }

    resultProducts.name = name;
    resultProducts.description = description;
    resultProducts.price = price;
    resultProducts.quantity = quantity;
    resultProducts.storeId = storeId;
    resultProducts.photo = file ? file.storedFilename : resultProducts.photo;
    const resultUpdatedProducts = await resultProducts.save();

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedProducts,
    });
  } catch (err) {
    removePhoto("users", req.file.storedFilename);
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultProducts = await products.findOne({
      where: {
        id: id,
      },
    });

    if (!resultProducts) {
      throw new DataNotFoundError("Product tidak ditemukan");
    }

    await resultProducts.destroy();

    return res.status(200).json({
      message: "Deleted",
      data: resultProducts,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getOneDashboard,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
