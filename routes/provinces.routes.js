const { Router } = require('express');
const router = Router();

const { ProvincesController } = require('../controllers');

router.get('/province', ProvincesController.getAll);
router.get('/province/:id(\\d+)', ProvincesController.getOne);

module.exports = router;