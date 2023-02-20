const Post = require('../model/post');
const Comment =require('../model/comment');

module.exports.create = (req, res) => {
    Post.create({
        content: req.body.content,
        // id of logged in user, which is set by setAuthentication function in passport config
        user: req.user._id
    }, function(err, post) {
        if (err) { console.log('error in creating a post'); return; }

        return res.redirect('back');
    });
};

module.exports.delete = (req, res) => {
    // get req to delete the post by getting id in req params
    // find post, if logged user is  same as post owner, then can delete/ and delete comments of the posts too 
    Post.findById(req.params.id , (err , post)=>{
        if(err) {console.log('error finding the post ', err); return }
        if(post){
            if(post.user == req.user.id ){
                post.remove();

                Comment.deleteMany({ post: req.params.id } , (err , comment)=>{
                    res.redirect('back');
                })
            }else{
                res.redirect('back');
            }
        }
    });
};
