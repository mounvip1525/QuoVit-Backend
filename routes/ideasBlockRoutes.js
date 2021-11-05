import express from "express";
import {
    ideasBlock_index,
    ideasBlock_create_idea,
    ideasBlock_delete,
    ideasBlock_update_idea
} from "../controllers/ideasBlock.js";
const router = express.Router();

router.get("/", ideasBlock_index);
router.post("/:id", ideasBlock_create_idea);
router.put("/:id",ideasBlock_update_idea);
router.delete("/:id", ideasBlock_delete);

export default router;
