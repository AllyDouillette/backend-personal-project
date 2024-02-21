import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCards, getCardById } from "../controller/cards.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCards)
router.get("/:id", checkToken, getCardById)

export default router
