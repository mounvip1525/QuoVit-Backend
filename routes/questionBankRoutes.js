import express from "express";
import { upload , getListFiles , download } from '../controllers/questionBank.js';
const router = express.Router();


  router.post("/upload", upload);
  router.get("/files", getListFiles);
  router.get("/files/:name", download);

export default router;