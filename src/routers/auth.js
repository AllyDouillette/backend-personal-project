import { Router } from "express"
import { registerUser } from "../controllers/users"

const router =  Router

router.post("/register", registerUser)

export default router
