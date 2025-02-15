import sqlite3 from "sqlite3"
import colors from "colors"
import { fetchAll } from "./sql.js"

export const getProjects = async (project_type) => {
    // PROJECT_TYPE // web_dev, web_design, graph_design or side_projects
    const db = new sqlite3.Database("projects.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return ["NOT OK", err.message]
    })

    let sql

    if (project_type == "web-development") {
        sql = "SELECT * FROM web_dev"
    } else if (project_type == "web-design") {
        sql = "SELECT * FROM web_design"
    } else if (project_type == "side-projects") {
        sql = "SELECT * FROM side_projects"
    } else if (project_type == "graphic-design") {
        sql = "SELECT * FROM graph_design"
    }
 
    const params = []

    try {
        const data = await fetchAll(db, sql, params)
        return ["OK", data]

    } catch(err) {
        return ["NOT OK", err.message]
    }


}


const addProject = (data) => {
    // data should be in this format [
    // PROJECT_TYPE // web_dev, web_design, graph_design or side_projects
    // PROJECT_NAME //might include <a href="" class="hyperlink">NAME OF PROJECT</a> // [en, ru]
    // PREVIEW_PATH // if not included, searching for PROJECT_NAME.jpg // [en, ru]
    // DESCRIPTION // text // [en, ru]
    // CONTENT // should be in this format [["TEXT", "txt"], ["PATH_TO_IMAGE", "jpg"], ["HTML", "html"], ...] 
    // ]

    const db = new sqlite3.Database("projects.db", sqlite3.OPEN_READWRITE)

    const project_type = data[0]
    const project_name = data[1]
    const unique_hash = createHash(project_name)
    const preview_path = data[2]
    const description = data[3]
    const content = JSON.parse(data[4])

    const sql = db.prepare(`INSERT INTO ? (unique_hash, name, preview_img, description, content) VALUES (?, ?, ?, ?, ?)`)
    const params = [unique_hash, project_type, project_name, preview_path, description, content]

    db.run(sql, params, (err) => {
        if (err) {
            db.close()
            return [`NOT OK`, {err}]
        }
    })

    db.close()
    return ["OK"]
}


const deleteProjectsByID = (data) => {
    // data should be in this format [
    // PROJECT_TYPE // web_dev, web_design, graph_design or side_projects
    // PROJECT_ID
    // ]

    try {
        const db = new sqlite3.Database("projects.db", sqlite3.OPEN_READWRITE)

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

function getHashes(project_type) {
    try {
        const db = new sqlite3.Database("projects.db", sqlite3.OPEN_READWRITE)
        const sql = db.prepare("SELECT unique_hash from ?")
        const params = [project_type]

        const hashCodes = fetchAll(db, sql, params)

        return hashCodes // learn promise and comeback 
    } catch (err) {
        return `Error occurred while executing sql:\n${err}`
    } finally {
        db.close()
    }
}

String.prototype.hashCode = function() {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function createHash(project_name) {
    isUnique = false
    var newHashCode
    while (isUnique != true) {
        let hashCodes = getHashes()
        newHashCode = project_name.hashCode()

        if (newHashCode in hashCodes) {
            project_name += project_name
        } else {
            isUnique = true
        }
    }
    return newHashCode
}