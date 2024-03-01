import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getStatistics, getStatisticsForDay, getStatisticsForDateRange } from "../controllers/statistic.js"

const router = new Router()
router.get("/", checkToken, checkAdminRole, getStatistics)
router.get("/:date", checkToken, checkAdminRole, getStatisticsForDay)
router.get("/:startDate/:endDate", checkToken, checkAdminRole, getStatisticsForDateRange)

export default router
