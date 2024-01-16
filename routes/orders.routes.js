const { Router } = require("express");
const router = Router();

const { OrdersController } = require("../controllers");

router.get("/orders", OrdersController.getAll);
router.get("/orders/:id(\\d+)", OrdersController.getOne);
router.post("/orders", OrdersController.createOne);
router.put("/orders/:id(\\d+)", OrdersController.updateOne);
router.delete("/orders/:id(\\d+)", OrdersController.deleteOne);

module.exports = router;
