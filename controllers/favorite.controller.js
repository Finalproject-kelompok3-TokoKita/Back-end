const { users, store, favorite } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    if (userId) {
      const Favorite = await favorite.findOne({
        where: {
          id: id,
        },
        include: [users, store],
      });

      if (!Favorite) {
        throw new DataNotFoundError("Favorite tidak ditemukan");
      }

      return res.status(200).json({
        message: "Scucessfully",
        data: Favorite,
      });
    }
  } catch (err) {
    next(err);
  }
};

const like = async (req, res, next) => {
  try {
    const { storeId } = req.body;

    const Like = await favorite.create({
      userId: req.user.id,
      storeId,
    });

    const Favorite = await favorite.findOne({
      where: {
        id: Like.id,
      },
      include: [users, store],
    });

    return res.status(201).json({
      message: "Created",
      data: Favorite,
    });
  } catch (err) {
    next(err);
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Like = await store.findOne({
      where: {
        id: id,
      },
    });

    if (!Like) {
      throw new DataNotFoundError("Suka tidak ditemukan");
    }

    await Like.destroy();

    return res.status(200).json({
      message: "Deleted",
      data: Like,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getOne,
  like,
  deleteOne,
};
