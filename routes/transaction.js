const express = require('express');
const { transactionView, transactionDynamic, transactionDetailView, transactionAdminDetailView, adminTransactionView, adminTransactionDynamic } = require('../controllers/transactionController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/transactions', verifyUser(['customer']), transactionView);
router.get('/admin-transactions', verifyUser(['admin']), adminTransactionView);
router.post('/transactionDynamic', verifyUser(['customer']), transactionDynamic);
router.post('/adminTransactionDynamic', verifyUser(['admin']), adminTransactionDynamic);
router.get('/transactions/:transactionId', verifyUser(['customer']), transactionDetailView);
router.get('/admin-transactions/:transactionId', verifyUser(['admin']), transactionAdminDetailView);

module.exports = router;
