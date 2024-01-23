const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares");
const { UsersController } = require("../controllers");

router.get("/users", UsersController.getAll);
router.get("/user", authMiddleware, UsersController.getOne);
router.post("/users", upload.single("file"), UsersController.createOne);
router.put("/users/:id(\\d+)", upload.single("file"), UsersController.updateOne);
router.delete("/users/:id(\\d+)", UsersController.deleteOne);

module.exports = router;
