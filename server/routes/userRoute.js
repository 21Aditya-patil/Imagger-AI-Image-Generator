import express from "express"
import { register, verifyotp, login } from "../controllers/userController.js"

const router = express.Router()

router.post("/register", register)
router.post("/otp", verifyotp)
router.post("/login", login)

export default router