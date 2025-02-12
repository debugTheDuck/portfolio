import express from "express"
import { getProjects } from "../database/projects_database.js"

const router = express.Router()


router.get("/web-development", async (req, res) => {
    const databaseData = await getProjects("web_development")
    const databaseResponse = databaseData[0]
    const databaseContent = JSON.stringify(databaseData[1])
    if (databaseResponse == "OK") {
        if (databaseContent != "[]") {
        res.send(databaseContent)   
        } else {
            res.send(`
<div class="nothingHere">
    <div class="imgWrapper">
        <img src="img/illustrations/nothing-in-here-illustration.svg" alt="nothing in here. i'm going to add more cases soon">
    </div>
</div>`)
        }
    } else {
        res.send(`Something went wrong: ${databaseData[1]}`)
    }
})

export default router