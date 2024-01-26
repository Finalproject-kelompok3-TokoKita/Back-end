const { Router } = require("express");
const router = Router();

const { OrdersController } = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/orders", OrdersController.getAll);
router.get("/orders/:id(\\d+)", OrdersController.getOne);
router.post("/orders", authMiddleware, OrdersController.createOne);
router.put("/orders/:id(\\d+)", OrdersController.updateOne);
router.delete("/orders/:id(\\d+)", OrdersController.deleteOne);
router.put("/bayar/:id(\\d+)", authMiddleware, OrdersController.bayarPembeli);
module.exports = router;
