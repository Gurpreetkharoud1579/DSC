const User = require('../model/user');

module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: 'DSC | Profile ',
    });
}

module.exports.signIn = (req, res) => {
    // if user logged in redirect to profile page
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: 'DSC | Sign-In ',
    })
}

module.exports.signUp = (req, res) => {
    // if user logged in redirect to profile page
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: 'DSC | Sign-Up ',
    })
}

// get the sign up data
module.exports.create = (req, res) => {
    console.log(req.body);
    const { email, password, cPassword, name } = req.body;
    if (password != cPassword) { console.log("password are not same"); return res.redirect('back') };
    User.findOne({
        "email": email
    }, (err, user) => {
        if (err) { console.log("Error finding the user before creating new ", err); return res.redirect('back'); };
        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) { console.log("Error creating new user ", err); return res.redirect('back'); };
                console.log("User created successfully ", user);
                return res.redirect('/users/sign-in');
            });
        } else { console.log("User already exists ", user); return res.redirect('back'); };

    });
};

module.exports.createSession = (req, res) => {
    return res.redirect('/');
};

module.exports.destroySession = (req, res, next) => {
    // logout() is from passpost js library 
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};