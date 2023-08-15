const mongoose = require("mongoose");

const balanceSchema = mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        amount: { type: Number, required: true },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = { Balance } 