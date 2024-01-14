const { Router } = require('express');
const router = Router();

const { UsersController } = require('../controllers');

router.get('/users', UsersController.getAll);
router.get('/users/:id(\\d+)', UsersController.getOne);
router.post('/users', UsersController.createOne);
router.put('/users/:id(\\d+)', UsersController.updateOne);
router.delete('/users/:id(\\d+)', UsersController.deleteOne);

module.exports = router;