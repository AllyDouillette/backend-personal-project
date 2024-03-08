import { Router } from "express"
import { getUsers, getUser, getSelf } from "../controllers/user.js"
import { getOwnCategories, getOwnCategoriesWithCards } from "../controllers/category.js"
import { getOwnCards, getCardsFromUser } from "../controllers/card.js"
import { getOwnStatistics,
	updateOwnStatisticEntry,
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
router.get("/me/categories", checkToken, getOwnCategories)
router.get("/me/categories/details", checkToken, getOwnCategoriesWithCards)
router.get("/me/statistics", checkToken, getOwnStatistics)
router.patch("/me/statistics/:id", checkToken, updateOwnStatisticEntry)
router.get("/me/statistics/:date", checkToken, getOwnStatisticForDate)
router.post("/me/statistics/:date", checkToken, createOwnStatisticForDate)
router.get("/me/statistics/:startDate/:endDate", checkToken, getOwnStatisticsForDateRange)
router.get("/:id/cards", checkToken, checkAdminRole, getCardsFromUser)

export default router
