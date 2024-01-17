const { orders, users } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const resultOrder = await orders.findAll({
      include: [users],
    });
    return res.status(200).json({
      message: "Succesfully",
      data: resultOrder,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultOrder = await orders.findOne({
      where: {
        id: id,
      },
      include: [users],
    });

    if (!resultOrder) {
      throw new DataNotFoundError("Toko tidak ditemukan");
    }

    return res.status(200).json({
      message: "Scucessfully",
      data: resultOrder,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { payment, status, json } = req.body;

    if (!payment || !status || !json) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const ordersCreated = await orders.create({
      userId: req.userId,
      payment,
      status,
      json,
    });

    const Order = await orders.findOne({
      where: {
        id: ordersCreated.id,
      },
      include: [users],
    });

    return res.status(201).json({
      message: "Created",
      data: Order,
    });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { payment, status, json } = req.body;

    if (!payment || !status || !json) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const resultOrder = await orders.findOne({
      where: {
        id: id,
      },
    });

    if (!resultOrder) {
      throw new DataNotFoundError("Store tidak ditemukan");
    }

    resultOrder.userId = req.userId;
    resultOrder.payment = payment;
    resultOrder.status = status;
    resultOrder.json = json;
    const resultUpdatedOrder = await resultOrder.save();

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultOrder = await orders.findOne({
      where: {
        id: id,
      },
    });

    if (!resultOrder) {
      throw new DataNotFoundError("Toko tidak ditemukan");
    }

    await resultOrder.destroy();

    return res.status(200).json({
      message: "Deleted",
      data: resultOrder,
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