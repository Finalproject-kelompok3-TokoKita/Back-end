const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.verifyToken, userController.getUsers);
router.post("/users", userController.register);
router.post("/login", userController.login);
router.get("/token", userController.refreshToken);
router.delete("/logout", userController.logout);

module.exports = router;
