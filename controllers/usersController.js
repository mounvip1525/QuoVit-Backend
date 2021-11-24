import users from "../models/user.js";
import { fetch_user_profile } from "./postController.js";
import bcrypt from "bcrypt";

//follow a user
const follow_user = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await users.findById(req.params.id);
      const currentUser = await users.findById(req.body.userId);
      if (!user.following.includes(req.body.userId)) {
        await user.updateOne({ $push: { following: req.body.userId } });
        await currentUser.updateOne({ $push: { followers: req.params.id } });
        res.status(200).send("user has been followed");
      } else {
        res.status(403).send("you already follow this user");
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

//unfollow a user
const unfollow_user = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await users.findById(req.params.id);
      const currentUser = await users.findById(req.body.userId);
      if (user.following.includes(req.body.userId)) {
        await user.updateOne({ $pull: { following: req.body.userId } });
        await currentUser.updateOne({ $pull: { followers: req.params.id } });
        const pd = await fetch_user_profile(req.params.id)
        res.status(200).send(pd)
        // res.status(200).send("user has been unfollowed");
      } else {
        res.status(403).send("you dont follow this user");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).send("you cant unfollow yourself");
  }
};

//get a user
const get_user = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    const { password, updatedAt, createdAt, isAdmin, ...other } = user._doc;
    res.status(200).send(other);
  } catch (err) {
    res.status(500).send(err);
  }
};

//update user
const update_user = async (req, res) => {
  console.log(req.body.userId, req.params.id);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).send(err);
      }
    }
    try {
      const user = await users.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  } else {
    return res.status(403).send("You can update only your account!");
  }
};

//delete user
const delete_user = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await users.findByIdAndDelete(req.params.id);
      res.status(200).send("Account has been deleted");
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    return res.status(403).send("You can delete only your account!");
  }
};

//get all users 
const users_index = (req, res) => {
  users
    .find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// get suggested users
const suggested_users_index = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    const following = await Promise.all(
      user.following.map(async (friendId) => {
        let user = await users.findById({ _id: friendId });
        return user._id.toString();
      }))
    let all_users = await users.find()
    let suggestions = all_users.filter(user=>!following.includes(user._id.toString()));
    let final = suggestions.filter(s=>s._id.toString() !== req.params.id)
    final = final.map((user) => {
          let tagline = `${user.branch} , VIT ${user.campus}`
          let { name , profileImg ,_id } = user;
          return {name,profileImg,tagline,_id}
      })
    res.status(200).send(final) 
  } catch(err){
    console.log(err)
    res.status(500).send(err)
  }
}
const get_mentors = async (req,res) => {
  try {
    let webDev = [] , pythonDev = [] , ml = [] , bct = [] , ds = [];
    const all_users = await users.find()
    all_users.map(user=>{
      user.expertise === "Web Development" ? webDev.push({name:user.name,profileImg:user.profileImg,_id:user._id}) : 
      user.expertise === "Python Developer" ? pythonDev.push({name:user.name,profileImg:user.profileImg,_id:user._id}) :
      user.expertise === "Machine Learning" ? ml.push({name:user.name,profileImg:user.profileImg,_id:user._id}) :
      user.expertise === "Blockchain Dev" ? bct.push({name:user.name,profileImg:user.profileImg,_id:user._id}) :
      user.expertise === "Data Science" ? ds.push({name:user.name,profileImg:user.profileImg,_id:user._id}) :
null
    })
    res.status(200).send({webDev,pythonDev,ml,bct,ds})
  } catch(err){
    console.log(err)
    res.status(500).send(err)
  }
}
export { update_user, delete_user, get_user, follow_user, unfollow_user, users_index, suggested_users_index, get_mentors };
