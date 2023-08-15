const mongoose = require("mongoose");
const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();

const saltLength = 10;
// Mongo DB conncetion
const dbConnection = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(dbConnection, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MONGO CONNECTION OPEN!!'))
    .catch(err => console.log(err));
    
//Seed User For admin
const seedDB = async () => {
    const salt = await bcrypt.genSalt(saltLength);
    const password = await bcrypt.hash("admin!@#", salt)
    const seedUser = {
        username: "admin",
        email: "admin@admin.com",
        role: "admin",
        password: password,
        status: 'active'
    };
    await User.deleteMany({});
    await User.create(seedUser);
}

seedDB().then(() => {
    mongoose.connection.close();
})