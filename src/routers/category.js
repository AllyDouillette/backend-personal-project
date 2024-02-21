import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCategories } from "../controllers/category.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCategories)
// router.get("/:id", getCategoryById)

export default router
