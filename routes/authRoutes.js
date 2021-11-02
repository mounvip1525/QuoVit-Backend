import express from "express";
import {
    signup, signin
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.get("/signin", signin);

export default router;
