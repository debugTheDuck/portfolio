import http from "http"
import path from "path"
import url from "url"

// routers import
import home from "./routes/home.js"
import api from "./routes/api.js"
import projects from "./routes/projects.js"

// middleware import
import logger from "./middleware/logger.js"
import errorHandler from "./middleware/error_handling.js"
import not_found from "./middleware/not_found.js"


import express from "express"
const app = express()


const PORT = process.env.PORT
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// static
app.use(express.static('./public'))

// set template engine
app.set('views', __dirname + '/public/views')
app.set("view engine", "ejs")

// middleware
app.use(logger)

// routing
app.use("/home", home)
app.use("/projects", projects)
app.use("/api", api)

// 404 handling
app.get("*", (req, res) => {
    res.status(404).render("404")
})

// error handling
app.use(not_found)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})