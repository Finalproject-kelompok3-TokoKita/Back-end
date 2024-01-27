const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { uploader } = require("../middlewares");
const { StoreController } = require("../controllers");

router.get("/store", authMiddleware, StoreController.getAll);
router.get("/getstore", StoreController.getStore);
router.get("/dashboard", authMiddleware, StoreController.dashboard);
router.get("/store/:id(\\d+)", StoreController.getOne);
router.post("/store", uploader("stores").single("file"), authMiddleware, StoreController.createOne);
router.put("/store/:id(\\d+)", uploader("stores").single("file"), authMiddleware, StoreController.updateOne);
router.delete("/store/:id(\\d+)", StoreController.deleteOne);

module.exports = router;
