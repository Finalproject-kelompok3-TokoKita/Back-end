const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { StoreController } = require("../controllers");

router.get("/store", authMiddleware, StoreController.getAll);
router.get("/dashboard", authMiddleware, StoreController.dashboard);
router.get("/store/:id(\\d+)", StoreController.getOne);
router.post("/store", authMiddleware, StoreController.createOne);
router.put("/store/:id(\\d+)", authMiddleware, StoreController.updateOne);
router.delete("/store/:id(\\d+)", StoreController.deleteOne);

module.exports = router;
