import http from "http"
PORT = process.env.PORT

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}

//JSON middleWare
const jsonMiddleware = (req, res, next) => {
    res.writeHead(200, {"Content-Type": "application/json"})
    next()
}


// handling GET requests
const getRequestHandler = (req, res) => {
    if (req.url === "/home") {

    }
}


// creating server
const server = http.createServer((req, res) => {
    logger(req, res, () => {
        if (req.method === "GET"){

        } else {

        }
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})