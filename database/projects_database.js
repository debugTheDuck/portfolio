import sqlite3, { OPEN_READWRITE } from "sqlite3"
import colors from "colors"

const addProject = (data) => {
    // data should be in this format [
    // PROJECT_TYPE // web_dev, web_design, graph_design or side_projects
    // PROJECT NAME //might include <a href="" class="hyperlink">NAME OF PROJECT</a>
    // PREVIEW_PATH // if not included, searching for PROJECT_NAME.jpg
    // DESCRIPTION // text
    // CONTENT // should be in this format [["TEXT", "txt"], ["PATH_TO_IMAGE", "jpg"], ["HTML", "html"], ...] 
    // ]

    try {
        const db = new sqlite3.Database("projects.db", OPEN_READWRITE)

        const project_type = data[0]
        const project_name = data[1]
        const preview_path = data[2]
        const description = data[3]
        const content = JSON.parse(data[4])

        const sql = db.prepare(`INSERT INTO ? (name, preview_img, description, content) VALUES (?, ?, ?, ?)`)
        const params = [project_type, project_name, preview_path, description, content]

        db.run(sql, params)

        return "OK"
    } catch (err) {
        return `Error occurred while executing sql:\n${err}`
    } finally {
        db.close()
    }
}


const deleteProjectsByID = (data) => {
    // data should be in this format [
    // PROJECT_TYPE // web_dev, web_design, graph_design or side_projects
    // PROJECT_ID

    try {
        const db = new sqlite3.Database("projects.db", OPEN_READWRITE)

        const project_type = data[0]
        const project_id = data[1]

        const sql = db.prepare("DELETE FROM ? WHERE id = ?")
        const params = [project_type, project_id]

        db.run(sql, params)

        return "OK"
    } catch (err) {
        return `Error occurred while executing sql:\n${err}`
    } finally {
        db.close()
    }
}