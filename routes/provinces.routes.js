const { Router } = require('express');
const router = Router();

const { ProvincesController } = require('../controllers');

router.get('/province', ProvincesController.getAll);
router.get('/province/:id(\\d+)', ProvincesController.getOne);
// router.post('/province', ProvincesController.createOne);
// router.put('/province/:id(\\d+)', ProvincesController.updateOne);
// router.delete('/province/:id(\\d+)', ProvincesController.deleteOne);

module.exports = router;