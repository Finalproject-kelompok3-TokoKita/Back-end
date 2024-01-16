const { Router } = require("express");
const router = Router();

const { StoreController } = require("../controllers");

router.get("/store", StoreController.getAll);
router.get("/store/:id(\\d+)", StoreController.getOne);
router.post("/store", StoreController.createOne);
router.put("/store/:id(\\d+)", StoreController.updateOne);
router.delete("/store/:id(\\d+)", StoreController.deleteOne);

module.exports = router;
