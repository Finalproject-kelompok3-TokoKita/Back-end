const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { FavoriteController } = require("../controllers");

router.get("/like", authMiddleware, FavoriteController.getAll);
router.post("/like", authMiddleware, FavoriteController.createOne);

module.exports = router;
