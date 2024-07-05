import { Router } from "express";
import { checkToken } from "../middleware/auth.js";
import { getOwnProfile } from "../controllers/profile.js";

const router = new Router()

router.get("/me", checkToken, getOwnProfile)

export default router
