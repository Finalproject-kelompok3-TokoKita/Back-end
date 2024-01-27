const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { CartController } = require("../controllers");

router.get("/cart", authMiddleware, CartController.getAll); // mengambil semua data cart
router.post("/cart", authMiddleware, CartController.createOne); //menambahkan cart
router.put("/cart", authMiddleware, CartController.updateOne);
router.delete("/cart", authMiddleware, CartController.deleteOne);

module.exports = router;
