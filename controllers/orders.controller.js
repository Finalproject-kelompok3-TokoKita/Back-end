const { orders, users, order_items, products, cart } = require("../models");
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
const getUserOrder = async (req, res, next) => {
  try {
    const resultOrder = await orders.findAll({
      where: {
        userId: req.user.id,
      },

      include: [
        users,
        {
          model: order_items,
          include: [products],
        },
      ],
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
    const orderProducts = await cart.findAll({
      where: {
        userId: req.user.id,
      },
      include: [products], // Include products to get access to product data
    });

    if (!orderProducts.length) {
      throw new BadRequestError("tidak ada isi cart");
    }

    let totalPayment = 0;

    for (const product of orderProducts) {
      const item = product.product; // Access the product data through the association
      const productPrice = item.price;
      const productQuantity = product.quantity;

      if (item.quantity < productQuantity) {
        throw new BadRequestError("Stok habis");
      }

      totalPayment += productPrice * productQuantity;
    }

    const ordersCreated = await orders.create({
      userId: req.user.id,
      status: "PENDING",
      payment: totalPayment, // Set the totalPayment in the orders table
    });

    for (const product of orderProducts) {
      await order_items.create({
        orderId: ordersCreated.id,
        productId: product.productId,
        quantity: product.quantity,
      });

      // Uncomment the following lines if you want to remove the products from the cart after creating the order
      await cart.destroy({
        where: {
          userId: req.user.id,
          productId: product.productId,
        },
      });
    }

    const Order = await orders.findOne({
      where: {
        id: ordersCreated.id,
      },
      include: [users, order_items],
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

const bayarPembeli = async (req, res) => {
  try {
    const { id } = req.params;
    const Order = await orders.findOne({
      where: {
        id: id,
        userId: req.user.id,
      },
      include: [order_items],
    });

    if (!Order) {
      throw new DataNotFoundError("Store tidak ditemukan");
    }

    // ngambil data order item
    for (const item of Order.order_items) {
      const product = await products.findOne({
        where: {
          id: item.productId,
        },
      });

      product.quantity = product.quantity - item.quantity;
      await product.save();
    }

    Order.status = "PAID";
    await Order.save();
    res.status(200).json({ message: "Pembayaran berhasil. Order telah diproses." });
  } catch (error) {
    console.error("Error in bayar ordere:", error);
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  bayarPembeli,
  getUserOrder,
};
