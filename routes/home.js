import express from "express"
import path from "path"
import url from "url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "index.html"))
})

export default router