const { categories, store, products } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const resultProducts = await products.findAll({
      include: [categories, store],
    });
    return res.status(200).json({
      message: "Succesfully",
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
      include: [categories, store],
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
    const { name, description, price, quantity, categoryId, storeId } = req.body;

    if (!name || !description || !price || !quantity || !categoryId || !storeId) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const category = await categories.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new BadRequestError("Pastikan id category valid");
    }

    const Store = await store.findOne({
      where: {
        id: storeId,
      },
    });

    if (!Store) {
      throw new BadRequestError("Pastikan id store valid");
    }

    const productCreated = await products.create({
      name,
      description,
      price,
      quantity,
      categoryId,
      storeId,
    });

    const Products = await products.findOne({
      where: {
        id: productCreated.id,
      },
      include: [categories, store],
    });

    return res.status(201).json({
      message: "Created",
      data: Products,
    });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, categoryId, storeId } = req.body;

    if (!name || !description || !price || !quantity || !categoryId || !storeId) {
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

    const category = await categories.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new BadRequestError("Pastikan id category valid");
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
    resultProducts.categoryId = categoryId;
    resultProducts.storeId = storeId;
    const resultUpdatedProducts = await resultProducts.save();

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedProducts,
    });
  } catch (err) {
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
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
