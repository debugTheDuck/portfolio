import express from "express"

import { getProjectsData } from "../controllers/api_controllers.js"

const router = express.Router()


router.get("/web-development", getProjectsData)
router.get("/graphic-design", getProjectsData)
router.get("/web-design", getProjectsData)
router.get("/side-projects", getProjectsData)

export default router