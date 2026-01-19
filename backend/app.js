// importing packages
import express from "express"
import config from './src/config/env.config.js'
import nanoid from "nano-id"
import dotenv from "dotenv"

dotenv.config()
import cookieParser from "cookie-parser"
import cors from 'cors'
import passport from './src/config/passport.js'
import path from "path"
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



// file importing 
import auth from "./src/routes/auth.routes.js"
import conectToDB from "./src/config/db.js"
import short_url from "./src/routes/shortUrl.routes.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js"
import { attachUser } from "./src/utils/attachUser.js"


const app = express()



// Middlewears
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())
// Allow CORS from frontend for cookies
app.use(cors({ origin: config.frontendUrl, credentials: true }))
app.use(attachUser)

app.use(express.static(path.join(__dirname, "./public")))

// Health check endpoint for Render
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" })
})

// api
app.use("/auth", auth)
app.use("/api", short_url)
app.get("/:id", redirectFromShortUrl)

import { errorHandler } from "./src/utils/Error.handling.js"
app.use(errorHandler)


app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

// Server starting
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    conectToDB()
    console.log(`Server running on port ${PORT}`)
})



