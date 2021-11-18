import express from "express";
import { facultyReviews_index,create_faculty,delete_faculty,rate_faculty } from "../controllers/facultyReviews.js";

const router = express.Router();

router.get("/",facultyReviews_index);
router.post("/:id",create_faculty);
router.delete("/:id",delete_faculty);
router.put("/rate/:id",rate_faculty);

export default router;