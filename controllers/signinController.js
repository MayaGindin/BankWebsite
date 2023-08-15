const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const authConfig = {
    expireTime: '1d',
};

const signinView = (req, res) => {
    res.render('signin', {
        status: '',
    });
}

const signin = async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOneAndUpdate({ username: username }, { lastLogin: new Date() }).select('-__v');
    if (!user) {
        return res.send({ status: "error", message: "Username provided is not a registered account" })
    }
    if (user.status != "active") {
        return res.send({ status: "error", message: "Your Account was deleted by admin." })
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.send({ status: "error", message: "Username or password not found!" })
    }

    // validation passed, create tokens
    const accessToken = jwt.sign({ _id: user._id }, process.env.AUTH_TOKEN_SECRET, { expiresIn: authConfig.expireTime });
    // remove password
    delete user._doc.password;
    const userData = user;
    const response = {
        userData,
        accessToken,
    };

    return res.status(200).send({
        status: 'success',
        response
    });
}

module.exports = {
    signinView,
    signin
}