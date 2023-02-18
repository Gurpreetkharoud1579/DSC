const User = require('../model/user');

module.exports.profile = (req, res) => {
    if (req.cookies.user_id) {
        const userId = req.cookies.user_id;
        User.findById(userId, (err, user) => {
            if (err) { console.log("Error finding the user ", err); return; };
            if (user) {
                console.log("logged In user is", user);
                return res.render('user_profile', {
                    title: 'Profile',
                    user: user,
                });
            } else { console.log("No user found "); return res.redirect('back'); };
        });
    } else {
        return res.redirect('/users/sign-in');
    }
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

module.exports.create = (req, res) => {
    console.log(req.body);
    const { email, password, cPassword, name } = req.body;
    if (password != cPassword) { console.log("password are not same"); return res.redirect('back') };
    User.findOne({
        "email": email
    }, (err, user) => {
        if (err) { console.log("Error finding the user before creating new ", err); return; };
        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) { console.log("Error creating new user ", err); return; };
                console.log("User created successfully ", user);
                return res.redirect('/users/sign-in');
            });
        } else { console.log("User already exists ", user); return res.redirect('back'); };

    });
};

module.exports.createSession = (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        "email": email
    }, (err, user) => {
        if (err) { console.log("Error finding the user ", err); return; };
        if (user) {
            if (user.password == password) {
                console.log("Successfully loged in");
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            } else { console.log("Wrong password, Check your password and try again "); return res.redirect('back'); };
        } else { console.log("No user found, check email or password and try again "); return res.redirect('back'); };
    })
};