const { Router } = require("express");
const router = Router();

const { OrdersController } = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/orders", OrdersController.getAll); //mengambil semua data orderan
router.get("/orders/:id(\\d+)", OrdersController.getOne);
router.get("/order", authMiddleware, OrdersController.getUserOrder);
router.post("/orders", authMiddleware, OrdersController.createOne); //membuat order dan menjadikan status nya pending
router.put("/orders/:id(\\d+)", OrdersController.updateOne);
router.delete("/orders/:id(\\d+)", OrdersController.deleteOne);
router.put("/bayar/:id(\\d+)", authMiddleware, OrdersController.bayarPembeli); // bayar user menjadikan satus nya PAID
module.exports = router;
