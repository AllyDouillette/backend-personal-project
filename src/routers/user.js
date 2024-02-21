import { Router } from "express"
import { getUsers, getUser, getSelf } from "../controllers/user.js"
import { getOwnCards, getCardsFromUser } from "../controllers/cards.js"
import { checkToken, checkAdminRole } from "../middleware/auth.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getUsers)
router.get("/me", checkToken, getSelf)
router.get("/:id", checkToken, checkAdminRole, getUser)
router.get("/me/cards", checkToken, getOwnCards)
router.get("/:id/cards", checkToken, checkAdminRole, getCardsFromUser)

export default router
