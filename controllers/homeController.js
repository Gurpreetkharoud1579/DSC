const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async (req, res) => {
    // get and set cookies
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // populate the user of each post
    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })
    //     .exec(function(err, posts) {
    //         if (err) { console.log("error finding posts", err); }

    //         User.find({} , (err ,  users)=>{
    //             return res.render('home', {
    //                 title: "DSC | Home",
    //                 posts: posts,
    //                 users: users
    //             });
    //         } )
           
    //     })
    try{
        // populate the user of each post
       let posts = await Post.find({})
       .populate('user')
       .populate({
           path: 'comments',
           populate: {
               path: 'user'
           }
       });
   
       let users = await User.find({});

       return res.render('home', {
           title: "Codeial | Home",
           posts:  posts,
           all_users: users
       });

   }catch(err){
       console.log('Error', err);
       return;
   }
}