const { users, favorite, store } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (userId) {
      const Favorite = await favorite.findAll({
        where: { userId },
        include: [store],
      });
      return res.status(200).json({
        message: "Succesfully",
        data: Favorite,
      });
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { storeId } = req.body;

    const Favorite = await favorite.findOne({
      where: {
        storeId: storeId,
        userId: req.user.id,
      },
    });

    if (Favorite) {
      throw new BadRequestError("Sudah disukai");
    }

    const favoriteCreated = await favorite.create({
      userId: req.user.id,
      storeId,
    });

    return res.status(201).json({
      message: "Created",
      data: favoriteCreated,
    });
  } catch (err) {
    next(err);
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const { storeId } = req.body;
    const Favorite = await favorite.findOne({
      where: {
        storeId: storeId,
        userId: req.user.id,
      },
    });

    if (!Favorite) {
      throw new DataNotFoundError("belum disukai");
    }

    await Favorite.destroy();

    return res.status(200).json({
      message: "Deleted",
      data: Favorite,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAll,
  createOne,
  deleteOne,
};
