const { store, products } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");
const { removePhoto } = require("../utils");

const getProductsByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userStore = await store.findOne({
      where: {
        userId: userId,
      },
    });

    if (!userStore) {
      return res.status(404).json({
        message: "Store not found for the given user",
        data: null,
      });
    }

    const resultProducts = await products.findAll({
      where: {
        storeId: userStore.id,
      },
    });

    return res.status(200).json({
      message: "Successfully",
      data: resultProducts,
    });
  } catch (err) {
    next(err);
  }
};


const getAll = async (req, res, next) => {
  try {
    const id = req.user;
    const resultProducts = await products.findAll({
      include: [store],
    });
    return res.status(200).json({
      message: "Succesfully",
      data: resultProducts,
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
      data: resultProducts,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const userId = req.user.id;
    const photoFilename = req.file ? req.file.storedFilename : null;

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
      photo: photoFilename,
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
    if (req.file && req.file.storedFilename) {
      removePhoto("products", req.file.storedFilename);
    }

    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const photoFilename = req.file ? req.file.storedFilename : null;
    const { name, description, price, quantity, storeId } = req.body;

    // if (!name || !description || !price || !quantity || !storeId) {
    //   throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    // }

    const resultProducts = await products.findOne({
      where: {
        id: id,
      },
    });

    if (!resultProducts) {
      throw new DataNotFoundError("Product tidak ditemukan");
    }
    const userStore = await store.findOne({
      where: {
        userId,
      },
    });

    if (!userStore) {
      throw new BadRequestError("Kamu tidak memiliki toko!");
    }

    const oldPhotoFilename = resultProducts.photo;
    resultProducts.name = name;
    resultProducts.description = description;
    resultProducts.price = price;
    resultProducts.quantity = quantity;
    resultProducts.storeId = userStore.id;
    resultProducts.photo = photoFilename || resultProducts.photo;
    const resultUpdatedProduct = await resultProducts.save();
    if (resultUpdatedProduct && oldPhotoFilename && oldPhotoFilename !== photoFilename) {
     removePhoto("products", oldPhotoFilename);
   }
    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedProduct,
    });
  } catch (err) {
    if (req.file && req.file.storedFilename) {
      removePhoto("products", req.file.storedFilename);
    }
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
    const oldPhotoFilename = resultProducts.photo;
    await resultProducts.destroy();
    if (oldPhotoFilename) {
      removePhoto("products", oldPhotoFilename);
    }
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
  getProductsByUserId,
};
