import path from "path"
import url from "url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ msg: err.message})
    } else {
        res.status(500).json({ msg: err.message })
    }
    next()
}

export default errorHandler