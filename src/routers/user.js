import { Router } from "express"
import { getUserById } from "../controllers/user.js"
import { checkToken } from "../middleware/auth.js"

const router = Router()

router.get("/:id", checkToken, getUserById)

export default router
