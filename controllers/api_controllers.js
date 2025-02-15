import { getProjects } from "../database/projects_database.js"

export const getProjectsData = async (req, res) => {
    const projectType = req.url.replace("/", "")
    const databaseData = await getProjects(projectType)
    const databaseResponse = databaseData[0]
    const databaseContent = databaseData[1]

    if (databaseResponse == "OK") {
        res.send(databaseContent)   
    } else {
        res.send(`Something went wrong: ${databaseContent}`)
    }
}