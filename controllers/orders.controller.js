const { orders, users, order_items, products } = require("../models");
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
    const { orderProducts } = req.body;

    // products dari body bentuknya array

    if (
      !orderProducts ||
      !Array.isArray(orderProducts) ||
      !orderProducts.length
    ) {
      throw new BadRequestError(
        "Request yang dikirimkan tidak sesuai dengan yang di izinkan!"
      );
    }

    for (const product of orderProducts) {
      const item = await products.findOne({
        where: {
          id: product.id,
        },
      });

      if (!item) {
        throw new BadRequestError("Product yang dimaksud tidak ada");
      }

      if (item.quantity < product.qty) {
        throw new BadRequestError("Stok habis");
      }
    }

    const ordersCreated = await orders.create({
      userId: req.user.id,
      status: "PENDING",
    });

    for (const product of orderProducts) {
      await order_items.create({
        orderId: ordersCreated.id,
        productId: product.id,
        quantity: product.qty,
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

    Order.status = "menunggu konfirmasi";
    await Order.save();
    res
      .status(200)
      .json({ message: "Pembayaran berhasil. Order telah diproses." });
  } catch (error) {
    console.error("Error in bayar ordere:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

const konfirmasiPenjual = async (req, res) => {
  try {
    const Order = req.orders;
    if (!Order) {
      return res.status(404).json({ message: "order tidak ditemukan" });
    }
    if (Order.status !== "menunggu konfirmasi") {
      return res.status(400).json({
        message: "Order tidak dapat dikonfirmasi",
      });
    }

    Order.status = "dikonfirmasi";
    await Order.save();
    res
      .status(200)
      .json({ message: "Pembayaran berhasil. Order telah diproses." });
  } catch (error) {
    console.error("Error in konfirmasi:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  bayarPembeli,
  konfirmasiPenjual,
};
