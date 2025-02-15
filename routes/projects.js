import express from "express"
import path from "path"
import url from "url"

import { renderProjectPage } from "../controllers/project_controllers.js"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get("/web-development", renderProjectPage)
router.get("/graphic-design", renderProjectPage)
router.get("/web-design", renderProjectPage)
router.get("/side-projects", renderProjectPage)

export default router