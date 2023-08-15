const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, min: 6, max: 255},
        password: { type: String, required: true, max: 1024, min: 6, },
        role: { type: String, enum: ['admin', 'customer'], required: true },
        status: { type: String, enum: ['active', 'deleted'], required: true },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = { User } 