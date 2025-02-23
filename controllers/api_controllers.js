import { getProjects, getProject } from "../database/projects_database.js"

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

export const getProjectData = async (req, res) => {
    const urlData = req.url
    const urlParts = urlData.split("/")
    const projectHash = urlParts[urlParts.length - 1]
    const projectType = urlParts[1]
    const databaseData = await getProject(projectType, projectHash)
    const databaseResponse = databaseData[0]
    const databaseContent = databaseData[1]

    if (databaseResponse == "OK") {
        res.send(databaseContent)   
    } else {
        res.send(`Something went wrong: ${databaseContent}`)
    }
}