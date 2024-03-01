import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth"

const router = new Router()
router.get("/", checkToken, checkAdminRole, getStatistics)

export default router
