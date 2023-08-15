const { User } = require("../models/User");
const bcrypt = require('bcrypt');

const saltLength = 10;

const usersView = async (req, res) => {
    const users = await User.find({ status: 'active' });
    res.render('users', {
        status: '',
        message: '',
        activePage: 'users',
        users: users
    });
}

const userDetailView = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('userDetail', {
        status: '',
        message: '',
        activePage: 'users',
        user: user
    });
}

const userAddView = async (req, res) => {
    res.render('userAdd', {
        status: '',
        message: '',
        activePage: 'users',
    });
}

const userAdd = async (req, res) => {

    // check for unique user
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) { 
        return res.send({ status: "error", message: "Username already exists" }); 
    }
    
    // hash the password
    const salt = await bcrypt.genSalt(saltLength);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
        status: 'active',
    }
    try {
        await User.create(userData);
        
        return res.send({ status: "success", message: "User successfully registered" })
    } catch (err) {
        console.log(err)
        return res.send({ status: "error", message: err.message })
    }
}

const userUpdate = async (req, res) => {
    const userId = req.params.userId;
    const userData = {
        email: req.body.email,
        role: req.body.role,
    }
    try {
        await User.findOneAndUpdate({ _id: userId }, userData, { new: true });
        
        return res.send({ status: "success", message: "User successfully updated" })
    } catch (err) {
        console.log(err)
        return res.send({ status: "error", message: err.message })
    }
}

const userDelete = async (req, res) => {
    const { userId } = req.body;

    try {
        await User.findOneAndUpdate({ _id: userId }, { status: 'deleted' }, { new: true });
        
        return res.send({ status: "success", message: "User successfully deleted" })
    } catch (err) {
        console.log(err)
        return res.send({ status: "error", message: err.message })
    }
}

module.exports = {
    usersView,
    userDetailView,
    userAddView,
    userAdd,
    userUpdate,
    userDelete
}