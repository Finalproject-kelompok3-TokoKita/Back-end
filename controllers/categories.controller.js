const { categories } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const resultCategories = await categories.findAll();
    return res.status(200).json({
      message: "Succesfully",
      data: resultCategories,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultCategories = await categories.findOne({
      where: {
        id: id,
      },
    });

    if (!resultCategories) {
      throw new DataNotFoundError("kategori yang anda cari tidak ditemukan!");
    }

    return res.status(200).json({
      message: "Scucessfully",
      data: resultCategories,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Pastikan field name tidak kosong!");
    }

    const Categories = await categories.create({
      name,
    });

    return res.status(201).json({
      message: "Created",
      data: Categories,
    });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("Pastikan field name tidak kosong!");
    }

    const Categories = await categories.findOne({
      where: {
        id,
      },
    });

    if (!Categories) {
      throw new DataNotFoundError("Data Kategory yang anda inginkan tidak ditemukan!");
    }

    Categories.name = name;
    const resultCategories = await Categories.save();

    return res.status(200).json({
      message: "Updated",
      data: resultCategories,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Categories = await categories.findOne({
      where: {
        id,
      },
    });

    if (!Categories) {
      throw new DataNotFoundError("Data provinsi yang anda inginkan tidak ditemukan!");
    }

    await Categories.destroy();

    return res.status(200).json({
      message: "Updated",
      data: Categories,
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
