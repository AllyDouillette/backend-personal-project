import { Router } from "express"
import { getUsers, getUser, getSelf } from "../controllers/user.js"
import { checkToken, checkAdminRole } from "../middleware/auth.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getUsers)
router.get("/me", checkToken, getSelf)
router.get("/:id", checkToken, getUser)

export default router
