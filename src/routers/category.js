import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCategories,
	createCategory,
	getCategoryById,
	updateCategoryById
} from "../controllers/category.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCategories)
router.post("/", checkToken, createCategory)
router.get("/:id", checkToken, getCategoryById)
router.put("/:id", checkToken, updateCategoryById)

export default router
