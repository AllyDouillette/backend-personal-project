import { Router } from "express"
import { getUsers, getUser, getSelf } from "../controllers/user.js"
import { getOwnCategories, getOwnCategoriesWithCards } from "../controllers/category.js"
import { getOwnCards, getCardsFromUser } from "../controllers/card.js"
import { getOwnStatistics,
	updateOwnStatistic,
	updateOwnStatisticForToday,
	getOwnStatisticForToday,
	getOwnStatisticForDate,
	createOwnStatisticForDate,
	getOwnStatisticsForDateRange
} from "../controllers/statistic.js"
import { checkToken, checkAdminRole } from "../middleware/auth.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getUsers)

router.get("/me", checkToken, getSelf)
router.get("/:id", checkToken, checkAdminRole, getUser)

router.get("/me/cards", checkToken, getOwnCards)
router.get("/:id/cards", checkToken, checkAdminRole, getCardsFromUser)

router.get("/me/categories", checkToken, getOwnCategories)
router.get("/me/categories/details", checkToken, getOwnCategoriesWithCards)

router.get("/me/statistics", checkToken, getOwnStatistics)
router.get("/me/statistics/today", checkToken, getOwnStatisticForToday)
router.get("/me/statistics/:date", checkToken, getOwnStatisticForDate)
router.get("/me/statistics/:startDate/:endDate", checkToken, getOwnStatisticsForDateRange)

router.post("/me/statistics/:date", checkToken, createOwnStatisticForDate)

router.patch("/me/statistics/today", checkToken, updateOwnStatisticForToday)
router.patch("/me/statistics/:id", checkToken, updateOwnStatistic)

export default router
