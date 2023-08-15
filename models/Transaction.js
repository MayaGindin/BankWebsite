const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        amount: { type: Number, required: true },
        type: { type: String, enum: ['deposit', 'transfer'], required: true },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction } 