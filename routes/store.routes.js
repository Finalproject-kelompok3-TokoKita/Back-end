const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { uploader } = require("../middlewares");
const { StoreController } = require("../controllers");

router.get("/store", authMiddleware, StoreController.getAll);
router.get("/check", authMiddleware, StoreController.check); //pengecekan apakah sudah ada toko atau belum jika belum data null
router.get("/getstore", StoreController.getStore);
router.get("/getfavorite", StoreController.getMostLikedStores);
router.get("/dashboard", authMiddleware, StoreController.dashboard);
router.get("/storebycity/:id(\\d+)", StoreController.getStorebycity);
router.get("/store/:id(\\d+)", StoreController.getOne);
router.post("/store", uploader("stores").single("file"), authMiddleware, StoreController.createOne);
router.put("/store/:id(\\d+)", uploader("stores").single("file"), authMiddleware, StoreController.updateOne);

module.exports = router;
