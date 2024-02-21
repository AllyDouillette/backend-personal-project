import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory
} from "../controllers/category.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCategories)
router.post("/", checkToken, createCategory)
router.get("/:id", checkToken, getCategory)
router.put("/:id", checkToken, updateCategory)
router.delete("/:id", checkToken, deleteCategory)

export default router
