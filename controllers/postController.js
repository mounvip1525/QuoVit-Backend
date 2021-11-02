import users from "../models/user.js";
import posts from "../models/posts.js";

//create a post
const create_post = async (req, res) => {
  const newPost = new posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).send(savedPost);
  } catch (err) {
    res.status(500).send(err);
  }
};

//update a post
const update_post = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    console.log(req.params.id,req.body.userId,post.userId)
    if (post.userId === req.body.userId) {
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

//delete a post
const delete_post = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).send("the post has been deleted");
    } else {
      res.status(403).send("you can delete only your post");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//like / dislike a post
const like_dislike_post = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send("The post has been disliked");
    }
  } catch (err) {
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

//get timeline posts
const get_timeline_posts = async (req, res) => {
  try {
    const currentUser = await users.findById(req.body.userId);
    const userPosts = await posts.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return posts.find({ userId: friendId });
      })
    );
    res.send(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).send(err);
  }
};

export { create_post , update_post , delete_post , get_post , get_timeline_posts , like_dislike_post }