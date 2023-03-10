const Comment = require('../model/comment');
const Post = require('../model/post');

module.exports.create = function(req, res) {
    Post.findById(req.body.post, function(err, post) {

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                // handle error
                if (err) console.log("error creating new comment ", err);
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}

module.exports.delete = (req, res)=>{
    Comment.findById(req.params.id, (err, comment)=>{
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();
            // deletes comment from posts comment array
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, (err, post)=>{
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}