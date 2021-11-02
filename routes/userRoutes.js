import express from "express";
import {update_user,delete_user,get_user,follow_user,unfollow_user} from "../controllers/usersController.js"

const router = express.Router()

//update user
router.put("/:id", update_user);

//delete user
router.delete("/:id", delete_user);

//get a user
router.get("/:id", get_user);

//follow a user

router.put("/:id/follow", follow_user);

//unfollow a user

router.put("/:id/unfollow", unfollow_user);

export default router;