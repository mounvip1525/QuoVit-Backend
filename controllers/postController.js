import users from "../models/user.js";
import posts from "../models/posts.js";

//create a post
const create_post = async (req, res) => {
    let uTag;
    const userId = req.params.id;
    users.findById(userId).then(result=>{
        try{
            uTag = `${result.branch} , ${result.campus}`
            posts.create({...req.body,creator:{ name:result.name,tagLine:uTag,profileImg:result.profileImg,id:result._id}}, (err, data) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(201).send(data);
                }
              });
        } catch(err) {
            res.status(500).send(err);
        }
    })
  };

//Get timeline posts
const get_timeline_posts = async (req, res) => {
    try {
      const currentUser = await users.findById(req.body.userId);
      const userPosts = await posts.find({ "creator.id": currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return posts.find({ "creator.id": friendId });
        })
      );
      const publicPosts = await posts.find({isPublic:true})
      friendPosts.map(fPost=>{
          fPost.length>0 ? fPost.map(f=>userPosts.push(f)) : null
      })
      userPosts.push(...publicPosts)
        let uniquePostIds = [] , uniquePosts = [];
        userPosts.map(post=>{
            if(!uniquePostIds.includes(post._id.toString())){
                uniquePostIds.push(post._id.toString())
                uniquePosts.push(post)
            }
        })
      res.send(uniquePosts)
    } catch (err) {
      res.status(500).send(err);
    }
  };

//delete a post
const delete_post = async (req, res) => {
    try {
      const post = await posts.findById(req.params.id);
      if (post.creator.id === req.body.userId) {
        await post.deleteOne();
        res.status(200).send("the post has been deleted");
      } else {
        res.status(403).send("you can delete only your post");
      }
    } catch (err) {
        console.log(err)
      res.status(500).send(err);
    }
  };

//like a post
const like_post = async (req, res) => {
    try {
      const post = await posts.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).send("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).send("You reverted your like");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  //Dislike a post
  const dislike_post = async (req, res) => {
      try {
        const post = await posts.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
          await post.updateOne({ $push: { dislikes: req.body.userId } });
          res.status(200).send("The post has been liked");
        } else {
          await post.updateOne({ $pull: { dislikes: req.body.userId } });
          res.status(200).send("You reverted your like");
        }
      } catch (err) {
        res.status(500).send(err);
      }
    };

//update a post
const update_post = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.creator.id === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).send("the post has been updated");
    } else {
      res.status(403).send("you can update only your post");
    }
  } catch (err) {
      console.log(err)
    res.status(500).send(err);
  }
};

//get a post
const get_post = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};


export { create_post , update_post , delete_post , get_post , get_timeline_posts , like_post , dislike_post }