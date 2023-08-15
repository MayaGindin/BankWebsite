const { Transaction } = require("../models/Transaction");
const { Balance } = require("../models/balance");

const depositView = (req, res) => {
    res.render('deposit', {
        status: '',
        message: '',
        activePage: 'deposit'
    });
}

const depositAdd = async (req, res) => {
    const { amount, comment } = req.body;
    try {
        const existBalance = await Balance.find({ customer: req.user._id }).countDocuments();
        if (existBalance == 0) {
            await Balance.create({
                amount: amount,
                comment: comment,
                customer: req.user._id
            });
        } else {
            await Balance.findOneAndUpdate({ customer: req.user._id }, { $inc: { amount: amount } }, { new: true });
        }
        
        await Transaction.create({
            amount: amount,
            type: 'deposit',
            sender: req.user._id,
            receiver: null,
        });

        return res.send({ status: "success", message: "Deposit successfully!" });
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }
}

const checkEnableBalance = async (req, res) => {
    const { amount } = req.body;
    try {
        const balance = await Balance.find({ customer: req.user._id });
        if (balance.length > 0) {
            if (balance[0].amount < parseFloat(amount)) {
                return res.send({ status: "error", message: `Balance is not enough. Your balance is ${balance[0].amount}` })
            } else {
                return res.send({ status: "success", message: `Balance is enough.` })
            }
            
        } else {
            return res.send({ status: "error", message: "Balance is not enough" })
        }
    } catch (error) {
        return res.send({ status: "error", message: error.message });
    }
}

module.exports = {
    depositView,
    depositAdd,
    checkEnableBalance,
}