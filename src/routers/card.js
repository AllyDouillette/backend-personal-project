import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCards } from "../controller/cards.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCards)

export default router
