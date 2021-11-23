import express from "express";
import { create_post , update_post , delete_post , get_post , get_timeline_posts , like_post , dislike_post, get_saved_posts, toggle_save_post, get_profile_details, update_profile_details, add_comment  } from "../controllers/postController.js";

const router = express.Router();

//create a post
router.post("/:id", create_post);
//update a post
router.put("/:id", update_post);
//delete a post
router.delete("/:postId/:userId", delete_post);
//like a post
router.put("/like/:id", like_post);
// dislike a post
router.put("/dislike/:id", dislike_post);
//get a post
// router.get("/:id", get_post);
//get timeline posts
router.get("/:id", get_timeline_posts);
//get saved posts
router.get("/saved/:id",get_saved_posts);
//toggle save posts
router.put("/saved/:id",toggle_save_post)
// user profile details
router.get("/profile/:id",get_profile_details);
//update profile details
router.put("/profile/:id",update_profile_details);
//add comment
router.put("/comment/:postId/:userId",add_comment)

export default router;