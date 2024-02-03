const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { uploader } = require("../middlewares");
const { UsersController } = require("../controllers");

router.get("/users", UsersController.getAll);
router.get("/user", authMiddleware, UsersController.getOne);
router.get("/users/:id(\\d+)", UsersController.getByID);
router.post("/users", uploader("users").single("file"), UsersController.createOne);
router.put("/users/:id(\\d+)", uploader("users").single("file"), UsersController.updateOne);
// router.delete("/users/:id(\\d+)", UsersController.deleteOne);

module.exports = router;
