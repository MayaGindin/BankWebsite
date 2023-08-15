const express = require('express');
const { dashboardView, customerDashboard, adminDashboard } = require('../controllers/dashboardController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/', verifyUser(['admin', 'customer']), dashboardView);
router.get('/dashboard', verifyUser(['customer']), customerDashboard);
router.get('/admin-dashboard', verifyUser(['admin']), adminDashboard);

module.exports = router;
