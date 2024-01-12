const UserController = require("../../controllers/userController");
const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:userId", UserController.getUserById);
router.get("/user", UserController.getUser);

module.exports = router;
