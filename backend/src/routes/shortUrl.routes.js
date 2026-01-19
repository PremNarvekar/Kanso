import express from "express"
import { createShortUrl} from "../controller/shortUrl.controller.js"
import { getUserHistory } from "../controller/shortUrl.controller.js"




const router = express.Router()


router.post("/", createShortUrl)
router.get('/history', getUserHistory)

export default router