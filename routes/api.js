import express from "express"

import { getProjectsData, getProjectData } from "../controllers/api_controllers.js"

const router = express.Router()


router.get("/web-development", getProjectsData)
router.get("/web-development/*", getProjectData)
router.get("/graphic-design", getProjectsData)
router.get("/graphic-design/*", getProjectData)
router.get("/web-design", getProjectsData)
router.get("/web-design/*", getProjectData)
router.get("/side-projects", getProjectsData)
router.get("/side-projects/*", getProjectData)

export default router