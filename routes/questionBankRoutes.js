import express from "express";
import {upload} from "../middleware/upload.js";
import { paper_index, paper_upload, paper_download } from '../controllers/questionBank.js';
const router = express.Router();


  router.post("/upload/:courseName/:courseCategory/:examType/:year", upload.single('file'), paper_upload);
  router.get("/files", paper_index);
  router.get("/download/:name",paper_download)

export default router;