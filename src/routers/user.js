import { Router } from "express"
import { getUsers, getUserById } from "../controllers/user.js"
import { checkToken, checkAdminRole } from "../middleware/auth.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getUsers)
router.get("/:id", checkToken, getUserById)

export default router
