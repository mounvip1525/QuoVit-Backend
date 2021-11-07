import express from "express";
import { create_post , update_post , delete_post , get_post , get_timeline_posts , like_post , dislike_post } from "../controllers/postController.js";

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
router.get("/:id", get_post);
//get timeline posts
router.get("/timeline/all", get_timeline_posts);

export default router;