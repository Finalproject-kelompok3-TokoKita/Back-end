const { Router } = require('express');
const router = Router();

const { AuthController } = require('../controllers');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

module.exports = router;