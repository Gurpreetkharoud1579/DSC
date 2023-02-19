const Post = require('../model/post');

module.exports.home = (req, res) => {
    // get and set cookies
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // populate the user of each post
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function(err, posts) {
            if (err) { console.log("error finding posts", err); }
            return res.render('home', {
                title: "DSC | Home",
                posts: posts
            });
        })
}