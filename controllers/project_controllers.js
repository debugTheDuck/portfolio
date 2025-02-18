const HOST_ROUTE = "http://localhost:7777" // change this

export const renderProjectsPage = async (req, res) => {
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

    let projectTypeDb
    if (projectType == "Web-development") {
        projectTypeDb = "web_dev"
    } else if (projectType == "Web-design") {
        projectTypeDb = "web_design"
    } else if (projectType == "Graphic-design") {
        projectTypeDb = "graph_design"
    } else if (projectType == "Side-projects") {
        projectTypeDb = "side_projects"
    }

    // render page
    res.render("projects", {
        isPreview: true,
        projectType: projectType,
        content: content,
        projectTypeDb: projectTypeDb
    })
}

export const renderProject = async (req, res) => {
    // /web-development/df5ec0519"
    // req.url

    const urlData = req.url
    const urlParts = urlData.split("/")
    const projectHash = urlParts[urlParts.length - 1]
    let projectType = urlParts[1]
    const urlToFetch = `${HOST_ROUTE}/api/${projectType}/${projectHash}`
    // get content
    const response = await fetch(urlToFetch)

    let content
    if (!response.ok) {
        content = `Something went wrong. Response status: ${response.status}`
    } else {
        content = await response.json()
    }

    let projectTypeDb
    if (projectType == "Web-development") {
        projectTypeDb = "web_dev"
    } else if (projectType == "Web-design") {
        projectTypeDb = "web_design"
    } else if (projectType == "Graphic-design") {
        projectTypeDb = "graph_design"
    } else if (projectType == "Side-projects") {
        projectTypeDb = "side_projects"
    }

    const projectName = content[0]["name"]
    console.log(content)
    console.log(projectType)

    // render page
    res.render("projects", {
        isPreview: false,
        projectType: projectName,
        content: content,
        projectTypeDb: projectTypeDb
    })
}