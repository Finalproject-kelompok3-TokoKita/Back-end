const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { FavoriteController } = require("../controllers");

router.get("/getlike", authMiddleware, FavoriteController.getOne);
router.get("/like", authMiddleware, FavoriteController.like);
router.delete("/store/:id(\\d+)", FavoriteController.deleteOne);

module.exports = router;
