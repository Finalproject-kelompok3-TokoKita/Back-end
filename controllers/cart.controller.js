const { cart, products, order_items, orders } = require("../models");
const { BadRequestError, DataNotFoundError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (userId) {
      const Cart = await cart.findAll({
        where: { userId },
        include: [products],
      });
      return res.status(200).json({
        message: "Succesfully",
        data: Cart,
      });
    }
  } catch (err) {
    next(err);
  }
};

const getPesanan = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (userId) {
      const orderlist = await orders.findAll({
        where: { userId },
      });
      return res.status(200).json({
        message: "Succesfully",
        data: orderlist,
      });
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const quantity = 1;

    const Cart = await cart.findOne({
      where: {
        productId: productId,
        userId: req.user.id,
      },
    });

    if (Cart) {
      throw new BadRequestError("Tidak boleh menambahkan product yang sudah di keranjang");
    }

    const cartCreated = await cart.create({
      userId: req.user.id,
      productId,
      quantity,
    });

    const Carts = await cart.findOne({
      where: {
        id: cartCreated.id,
      },
    });

    return res.status(201).json({
      message: "Created",
      data: Carts,
    });
  } catch (err) {
    next(err);
  }
};
const updateOne = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const Cart = await cart.findOne({
      where: {
        productId: productId,
        userId: req.user.id,
      },
    });

    if (!Cart) {
      throw new DataNotFoundError("Cart tidak ditemukan");
    }
    Cart.quantity = quantity;
    const resultUpdatedCart = await Cart.save();

    return res.status(200).json({
      message: "Updated",
      data: resultUpdatedCart,
    });
  } catch (err) {
    next(err);
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const Cart = await cart.findOne({
      where: {
        productId: productId,
        userId: req.user.id,
      },
    });

    if (!Cart) {
      throw new DataNotFoundError("cart tidak ditemukan");
    }

    await Cart.destroy();

    return res.status(200).json({
      message: "Deleted",
      data: Cart,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAll,
  getPesanan,
  createOne,
  updateOne,
  deleteOne,
};
