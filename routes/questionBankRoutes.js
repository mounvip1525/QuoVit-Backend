import express from "express";
import { upload } from "../middleware/upload.js";
import { paper_index, paper_upload, paper_download, courses_index, course_papers } from '../controllers/questionBank.js';
const router = express.Router();

router.get("/", courses_index);
router.get("/course/:courseName", course_papers);
router.post("/:courseName/:courseCategory/:examType/:year", upload.single('file'), paper_upload);
router.get("/download/:courseName/:id", paper_download);
router.get("/files", paper_index);

export default router;