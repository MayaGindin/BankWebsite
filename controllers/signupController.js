const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const { registerValidation } = require("../utils/validation");

const saltLength = 10;

const signupView = (req, res) => {
    res.render('signup', {
        status: ''
    });
}

const signup = async (req, res) => {
    let body = req.body;
    body.role = "customer";
    body.status = 'active';
    
    // validate request
    const { error } = registerValidation(body);
    if (error) { 
        return res.render("signup", { status: "error", message: error.details[0].message }); 
    }

    // check for unique user
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) { 
        return res.render("signup", { status: "error", message: "Username already exists" }); 
    }
    
    // hash the password
    const salt = await bcrypt.genSalt(saltLength);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
        status: body.status
    }

    try {
        await User.create(userData);
        
        return res.render("signin", { status: "success", message: "User successfully registered" })
    } catch (err) {
        console.log(err)
        return res.render("signup", { status: "error", message: err.message })
    }
}

module.exports = {
    signupView,
    signup
}