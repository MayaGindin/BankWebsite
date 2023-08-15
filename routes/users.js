const express = require('express');
const { usersView, userAddView, userDetailView, userAdd, userUpdate, userDelete } = require('../controllers/userController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/users', verifyUser(['admin']), usersView);
router.post('/users/create', verifyUser(['admin']), userAdd);
router.get('/users/create', verifyUser(['admin']), userAddView);
router.get('/users/:userId', verifyUser(['admin']), userDetailView);
router.put('/users/:userId', verifyUser(['admin']), userUpdate);
router.delete('/users', verifyUser(['admin']), userDelete);

module.exports = router;
