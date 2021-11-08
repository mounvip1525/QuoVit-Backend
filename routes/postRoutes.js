import express from "express";
import { create_post , update_post , delete_post , get_post , get_timeline_posts , like_post , dislike_post, get_saved_posts, toggle_save_post  } from "../controllers/postController.js";

const router = express.Router();

//create a post
router.post("/:id", create_post);
//update a post
router.put("/:id", update_post);
//delete a post
router.delete("/:id", delete_post);
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


export default router;