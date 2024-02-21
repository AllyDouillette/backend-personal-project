import { Router } from "express"
import { getUsers, getUser } from "../controllers/user.js"
import { checkToken, checkAdminRole } from "../middleware/auth.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getUsers)
router.get("/:id", checkToken, getUser)

export default router
