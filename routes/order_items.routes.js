const { Router } = require("express");
const router = Router();

const { Order_ItemController } = require("../controllers");

router.get("/items", Order_ItemController.getAll);
router.get("/items/:id(\\d+)", Order_ItemController.getOne);
router.post("/items", Order_ItemController.createOne);
router.put("/items/:id(\\d+)", Order_ItemController.updateOne);
router.delete("/items/:id(\\d+)", Order_ItemController.deleteOne);

module.exports = router;
