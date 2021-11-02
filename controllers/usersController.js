import users from "../models/user.js";
import bcrypt from "bcrypt";

//update user
const update_user = async (req, res) => {
    console.log(req.body.userId,req.params.id)
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
        console.log(err)
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

//follow a user

const follow_user = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await users.findById(req.params.id);
      const currentUser = await users.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("user has been followed");
      } else {
        res.status(403).send("you already follow this user");
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err)
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
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).send("user has been unfollowed");
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

export {update_user,delete_user,get_user,follow_user,unfollow_user};