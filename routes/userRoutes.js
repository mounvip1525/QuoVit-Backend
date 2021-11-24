import express from "express";
import {update_user,delete_user,get_user,follow_user,unfollow_user,users_index, suggested_users_index, get_mentors} from "../controllers/usersController.js"

const router = express.Router()

//get all users
router.get("/",users_index)

router.get("/getMentors",get_mentors)

//update user
router.put("/:id", update_user);

//delete user
router.delete("/:id", delete_user);

//get a user
router.get("/:id", get_user);

//follow a user
router.put("/follow/:id", follow_user);

//unfollow a user
router.put("/unfollow/:id", unfollow_user);

//get suggested users
router.get("/suggestions/:id",suggested_users_index);

export default router;