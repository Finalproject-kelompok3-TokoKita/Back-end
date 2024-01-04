const express = require("express");
const { getUsers, Register, Login, Logout } = require("../controllers/userController");
const { verifyToken } = require("../middleware/VerifyToken");
const { refreshToken } = require("../controllers/RefreshToken");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

module.exports = router;
