const { Transaction } = require("../models/Transaction");
const { Balance } = require("../models/balance");
const { ObjectId } = require('mongodb');

const dashboardView = async (req, res) => {

    if (req.user.role == 'admin') {
        return res.redirect('/admin-dashboard');
    } else {
        return res.redirect('/dashboard');
    }
}

const customerDashboard = async (req, res) => {
    const balance = await Balance.find({ customer: req.user._id });
    const balanceAmount = balance && balance.length > 0 ? balance[0].amount : 0;
    const transactions = await Transaction.find({
        $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
        ],
    });

    const statistics = await Transaction.aggregate([
        {
            $match: { sender: new ObjectId(req.user._id) }

        },
        { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

    return res.render('customer-dashboard', { activePage: '', balanceAmount: balanceAmount, transactions: transactions, statistics: statistics });
}

const adminDashboard = async (req, res) => {
    const transactions = await Transaction.find();

    const statistics = await Transaction.aggregate([
        { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

    const charts = await Transaction.aggregate([
        {
            $lookup: {
              from: 'users', // Replace with the actual name of your users collection
              localField: 'sender',
              foreignField: '_id',
              as: 'senderInfo'
            }
        },
        {
            $group: {
                _id: {
                    // customer: '$senderInfo.username',
                    createdAt: {
                      $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    }
                },
                transferSum: { $sum: { $cond: [{ $eq: ["$type", "transfer"] }, "$amount", 0] } },
                depositSum: { $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0] } }
            }
        }
    ]);

    const dateList = [];
    const transferSum = [];
    const dpositSum = [];
    for (let chart of charts) {
        dateList.push(chart['_id']['createdAt']);
        transferSum.push(chart['transferSum']);
        dpositSum.push(chart['depositSum']);
    }

    const chartData = {
        dateList,
        transferSum,
        dpositSum
    }


    return res.render('admin-dashboard', { activePage: '', transactions: transactions, statistics: statistics, chartData: chartData });
}

module.exports = {
    dashboardView,
    customerDashboard,
    adminDashboard
}