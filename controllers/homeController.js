const Post = require('../model/post');

module.exports.home = (req, res) => {
    // get and set cookies
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // populate the user of each post
    Post.find({}).populate('user').exec((err, posts) => {
        if (err) {
            console.log('Error finding the posts', err);
            return res.redirect('back');
        }

        return res.render('home', {
            title: "DSC | Home",
            posts: posts
        });
    })
}