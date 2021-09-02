import express from "express";
import confessionController from "../controllers/confessionController.js";

const router = express.Router();

router.get("/", confessionController.confession_index);
router.post("/add", confessionController.confession_create_post);
router.delete("/delete/:id", confessionController.confession_delete);

export default router;
