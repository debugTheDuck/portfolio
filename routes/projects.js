import express from "express"
import path from "path"
import url from "url"

import { renderProjectsPage, renderProject } from "../controllers/project_controllers.js"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get("/web-development", renderProjectsPage)
router.get("/web-development/*", renderProject)
router.get("/graphic-design", renderProjectsPage)
router.get("/graphic-design/*", renderProject)
router.get("/web-design", renderProjectsPage)
router.get("/web-design/*", renderProject)
router.get("/side-projects", renderProjectsPage)
router.get("/side-projects/*", renderProject)

export default router