const express = require('express');
const { depositView, depositAdd, checkEnableBalance } = require('../controllers/depositController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/deposit', verifyUser(['customer']), depositView);
router.post('/deposit', verifyUser(['customer']), depositAdd);
router.post('/checkEnableBalance', verifyUser(['customer']), checkEnableBalance);

module.exports = router;
