const HOST_ROUTE = "http://localhost:7777" // change this

export const renderProjectPage = async (req, res) => {
    // projectType start with capital letter
    const urlPath = req.url.replace("/", "")
    const firstLetter = urlPath.slice(0, 1).toUpperCase()
    const projectType = firstLetter + urlPath.slice(1, urlPath.length)

    const urlToFetch = `${HOST_ROUTE}/api/${urlPath}`
    // get content
    const response = await fetch(urlToFetch)

    let content
    if (!response.ok) {
        content = `Something went wrong. Response status: ${response.status}`
    } else {
        content = await response.json()
    }

    // render page
    res.render("projects", {
        projectType: projectType,
        content: content
    })
}