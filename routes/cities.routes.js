const { Router } = require('express');
const router = Router();

const { CitiesController } = require('../controllers');

router.get('/cities', CitiesController.getAll);
router.get('/city/:id(\\d+)', CitiesController.getByProvince);
router.get('/cities/:id(\\d+)', CitiesController.getOne);

module.exports = router;