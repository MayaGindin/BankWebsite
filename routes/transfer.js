const express = require('express');
const { transferView, transferAdd } = require('../controllers/transferController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/transfer', verifyUser(['customer']), transferView);
router.post('/transfer', verifyUser(['customer']), transferAdd);

module.exports = router;
