import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCategories, getCategoryById } from "../controllers/category.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCategories)
router.get("/:id", checkToken, getCategoryById)

export default router
