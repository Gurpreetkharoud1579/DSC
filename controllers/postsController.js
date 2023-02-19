const Post = require('../model/post')

module.exports.create = (req, res) => {
    Post.create({
        content: req.body.content,
        // id of logged in user, which is set by setAuthentication function in passport config
        user: req.user._id
    }, function(err, post) {
        if (err) { console.log('error in creating a post'); return; }

        return res.redirect('back');
    });
}