const { Transaction } = require("../models/Transaction");
const { User } = require("../models/User");
const { Balance } = require("../models/balance");

const transferView = async (req, res) => {

    const receivers = await User.find({ role: { $ne: 'admin' }, _id: { $ne: req.user._id } }) 
    return res.render('transfer', {
        status: '',
        message: '',
        activePage: 'transfer',
        receivers: receivers
    });
}

const transferAdd = async (req, res) => {
    const { amount, comment, receiver } = req.body;
    try {
        await Balance.findOneAndUpdate({ customer: req.user._id }, { $inc: { amount: -amount } }, { new: true });

        const existBalance = await Balance.find({ customer: receiver }).countDocuments();
        if (existBalance == 0) {
            await Balance.create({
                amount: amount,
                comment: comment,
                customer: receiver
            });
        } else {
            await Balance.findOneAndUpdate({ customer: receiver }, { $inc: { amount: amount } }, { new: true });
        }
        
        await Transaction.create({
            amount: amount,
            type: 'transfer',
            sender: req.user._id,
            receiver: receiver,
        });


        return res.send({ status: "success", message: "Transfer successfully!" });
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }
}

module.exports = {
    transferView,
    transferAdd,
}