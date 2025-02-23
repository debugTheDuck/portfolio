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

        data.forEach(project => {
            project.name = JSON.parse(project.name)
            project.description = JSON.parse(project.description)
            project.preview_img = JSON.parse(project.preview_img)
            project.content = JSON.parse(project.content)
        })
        return ["OK", data]

    } catch(err) {
        return ["NOT OK", err.message]
    }
}

export const getProject = async (project_type, hash_code) => {
    const db = new sqlite3.Database("projects.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return ["NOT OK", err.message]
    })

    let sql

    if (project_type == "web-development") {
        sql = "SELECT * FROM web_dev WHERE unique_hash = ?"
    } else if (project_type == "web-design") {
        sql = "SELECT * FROM web_design WHERE unique_hash = ?"
    } else if (project_type == "side-projects") {
        sql = "SELECT * FROM side_projects WHERE unique_hash = ?"
    } else if (project_type == "graphic-design") {
        sql = "SELECT * FROM graph_design WHERE unique_hash = ?"
    }

    const params = [hash_code]

    try {
        const data = await fetchAll(db, sql, params)

        data.forEach(project => {
            project.name = JSON.parse(project.name)
            project.description = JSON.parse(project.description)
            project.preview_img = JSON.parse(project.preview_img)
            project.content = JSON.parse(project.content)
        })
        return ["OK", data]

    } catch(err) {
        return ["NOT OK", err.message]
    }
}