import express from "express"
import { saveImage, getImages, deleteImage } from "../controllers/imageController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getImages)
router.post("/save", protect, saveImage)
router.delete("/delete/:id", protect, deleteImage)

export default router