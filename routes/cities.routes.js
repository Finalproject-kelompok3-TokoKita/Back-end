const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router();

const { CitiesController } = require('../controllers');

router.get('/cities', authMiddleware, CitiesController.getAll);
router.get('/cities/:id(\\d+)', CitiesController.getOne);
router.post('/cities', CitiesController.createOne);
router.put('/cities/:id(\\d+)', CitiesController.updateOne);
router.delete('/cities/:id(\\d+)', CitiesController.deleteOne);

module.exports = router;