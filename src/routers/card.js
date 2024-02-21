import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCards, getCardById, createCard, updateCard, deleteCard } from "../controller/cards.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCards)
router.get("/:id", checkToken, getCardById)
router.post("/", checkToken, createCard)
router.put("/:id", checkToken, updateCard)
router.delete("/:id", checkToken, deleteCard)

export default router
