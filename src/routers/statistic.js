import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getStatistics } from "../controllers/statistic.js"

const router = new Router()
router.get("/", checkToken, checkAdminRole, getStatistics)

export default router
