const { order_items, orders, products } = require("../models");
const { DataNotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const resultOrderItem = await order_items.findAll({
      include: [orders, products],
    });
    return res.status(200).json({
      message: "Succesfully",
      data: resultOrderItem,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultOrder_Item = await order_items.findOne({
      where: {
        id: id,
      },
      include: [orders, products],
    });

    if (!resultOrder_Item) {
      throw new DataNotFoundError("Toko tidak ditemukan");
    }

    return res.status(200).json({
      message: "Scucessfully",
      data: resultOrder_Item,
    });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { orderId, productId, quantity } = req.body;

    if (!orderId || !productId || !quantity) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const orderItemCreated = await order_items.create({
      orderId,
      productId,
      quantity,
    });

    const Order = await order_items.findOne({
      where: {
        id: orderItemCreated.id,
      },
      include: [orders, products],
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
    const { orderId, productId, quantity } = req.body;

    if (!orderId || !productId || !quantity) {
      throw new BadRequestError("Pastikan tidak ada field yang kosong!");
    }

    const resultOrder_Item = await order_items.findOne({
      where: {
        id: id,
      },
    });

    if (!resultOrder_Item) {
      throw new DataNotFoundError("Store tidak ditemukan");
    }

    resultOrder_Item.orderId = orderId;
    resultOrder_Item.productId = productId;
    resultOrder_Item.quantity = quantity;
    const resultUpdatedOrderItem = await resultOrder_Item.save();

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedOrderItem,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultOrderItem = await order_items.findOne({
      where: {
        id: id,
      },
    });

    if (!resultOrderItem) {
      throw new DataNotFoundError("Toko tidak ditemukan");
    }

    await resultOrderItem.destroy();

    return res.status(200).json({
      message: "Deleted",
      data: resultOrderItem,
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
