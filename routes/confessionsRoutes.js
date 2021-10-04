import express from "express";
import {
  confession_index,
  confession_create_post,
  confession_delete,
} from "../controllers/confessionController.js";
const router = express.Router();

router.get("/", confession_index);
router.post("/add", confession_create_post);
router.delete("/delete/:id", confession_delete);

export default router;
