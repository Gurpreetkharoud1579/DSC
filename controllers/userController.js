const User = require('../model/user');

module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: 'DSC | Sign-In ',
    });
}

module.exports.signIn = (req, res) => {
    return res.render('sign_in', {
        title: 'DSC | Sign-In ',
    })
}

module.exports.signUp = (req, res) => {
    return res.render('sign_up', {
        title: 'DSC | Sign-Up ',
    })
}