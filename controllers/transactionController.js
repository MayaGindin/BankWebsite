const { Transaction } = require("../models/Transaction");
const { ObjectId } = require('mongodb');
const moment = require("moment");

const transactionView = async (req, res) => {

    res.render('transaction', {
        status: '',
        message: '',
        activePage: 'transaction',
        
    });
}

const adminTransactionView = async (req, res) => {

    res.render('admin-transactions', {
        status: '',
        message: '',
        activePage: 'admin-transactions',
        
    });
}

const transactionDetailView = async (req, res) => {
    const transaction = await Transaction.findById(new ObjectId(req.params.transactionId)).populate({
        path: 'sender',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).populate({
        path: 'receiver',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).select('-__v');

    res.render('transactionDetail', {
        status: '',
        message: '',
        activePage: 'transaction',
        transaction: transaction
    });
}

const transactionAdminDetailView = async (req, res) => {
    const transaction = await Transaction.findById(new ObjectId(req.params.transactionId)).populate({
        path: 'sender',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).populate({
        path: 'receiver',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).select('-__v');

    res.render('transactionAdminDetail', {
        status: '',
        message: '',
        activePage: 'admin-transactions',
        transaction: transaction
    });
}

const transactionDynamic = async (req, res) => {

    const { daterange } = req.body;
    const dateFilter = daterange ? { createdAt: { $gte: moment(daterange.split(' - ')[0], 'YYYY-MM-DD').startOf('day'), $lte: moment(daterange.split(' - ')[1], 'YYYY-MM-DD').endOf('day') } } : {}; 

    const transactions = await Transaction.find({
        $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
        ],
        ...dateFilter
    }).sort({ createdAt: -1 }).populate({
        path: 'sender',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).populate({
        path: 'receiver',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).select('-__v');
    return res.render('transactionList', {
        transactions: transactions,
    });
}

const adminTransactionDynamic = async (req, res) => {

    const { daterange } = req.body;
    const dateFilter = daterange ? { createdAt: { $gte: moment(daterange.split(' - ')[0], 'YYYY-MM-DD').startOf('day'), $lte: moment(daterange.split(' - ')[1], 'YYYY-MM-DD').endOf('day') } } : {}; 

    const transactions = await Transaction.find({
        ...dateFilter
    }).sort({ createdAt: -1 }).populate({
        path: 'sender',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).populate({
        path: 'receiver',
        select: {
            _id: 1, username: 1, email: 1, role: 1,
        },
    }).select('-__v');
    return res.render('transactionAdminList', {
        transactions: transactions,
    });
}


module.exports = {
    transactionView,
    transactionDynamic,
    transactionDetailView,
    adminTransactionView,
    adminTransactionDynamic,
    transactionAdminDetailView
}
