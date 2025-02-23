import colors from "colors"

const requestColors = {
    "GET": "green",
    "POST": 'blue',
    "DELETE": "red"
}

const logger = (req, res, next) => {
    const requestColor = requestColors[req.method] || "white"

    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[requestColor])
    next()
}


export default logger