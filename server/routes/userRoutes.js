const express = require('express');
const router = express.Router();
const userAPI = require('../controllers/userController');

router.get('/users', userAPI.getUser);
router.get('/users/:id', userAPI.getUserById);

router.post('/users', userAPI.createUser);
router.patch('/users/:id', userAPI.updateUser);
router.delete('/users/:id', userAPI.deleteUser);


module.exports = router; 