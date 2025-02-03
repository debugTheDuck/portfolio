// ONLOAD FUNCTION
window.addEventListener("load", (event) => {
    console.log("page is fully loaded")

    let isMobileSite = isMobile()
    setSiteState(isMobileSite)
    let isMobileState = getIsMobileAttribute()

    setTopMargin(isMobileState)

    if (isMobileState == "true") {
        adaptationMobile()
    } else {
        adaptationPC()
    }

    addListeners()

    changingAboutMeTextFunction()
})

function addListeners() {
    for (let navButton of navButtonsSide) {
        navButton.addEventListener("click", (e) => {sideNavControl(e)})
    }
    for (let navButton of navButtonsHeader) {
        navButton.addEventListener("click", (e) => {headerNavControl(e)})
    }

    for (let contactMeButton of contactMeButtons) {
        contactMeButton.addEventListener("click", function () {contactMeRouting()})
    }
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// DISPLAY CHANGiNG
const body = document.querySelector("body")
const headerDisplayModeButton = document.querySelector("#headerDisplayModeButton")
const sideNavDisplayModeButton = document.querySelector("#sideNavDisplayModeButton")


headerDisplayModeButton.addEventListener('click', function () {changeDisplayTheme()})
sideNavDisplayModeButton.addEventListener('click', function () {changeDisplayTheme()})


function changeDisplayTheme () {
    if (getCurrentDisplayTheme() == "light") {
        var mode = "dark"
    } else {
        var mode = "light"
    }

    changeDisplayThemeTo(mode)

    changeIcons(mode)
}


function getCurrentDisplayTheme () {
    return body.getAttribute("display-mode")
}

function changeDisplayThemeTo (displayTheme) {
    body.setAttribute("display-mode", displayTheme)
}

function changeIcons (displayTheme) {
    if (displayTheme == "light") {
        changeIconsDark()
    } else {
        changeIconsLight()
    }
}

function changeIconsDark() {
    headerDisplayModeButton.src = "img/icons/nav/dark-mode-icon.svg"
    sideNavDisplayModeButton.src = "img/icons/nav/dark-mode-icon.svg"

}

function changeIconsLight() {
    headerDisplayModeButton.src = "img/icons/nav/light-mode-icon.svg"
    sideNavDisplayModeButton.src = "img/icons/nav/light-mode-icon.svg"
}


// HOME SECTiON

//contact me
const homeContactMeButton1 = document.querySelector("#homeContactMeButton1")
const homeContactMeButtonIcon1 = document.querySelector("#homeContactMeButtonIcon1")
const homeContactMeButton2 = document.querySelector("#homeContactMeButton2")
const homeContactMeButtonIcon2 = document.querySelector("#homeContactMeButtonIcon2")

const contactMeSocials = document.querySelector("#contactMeSocials")


homeContactMeButton1.addEventListener('click', function () {showHideContacts()})
homeContactMeButton2.addEventListener('click', function () {showHideContacts()})


function showHideContacts() {
    let isVisible = isContactsVisible()
    if (isVisible == "false") {
        showContacts()
    } else {
        hideContacts()
    }
    changeContactVisibilityAttribute(isVisible)
    rotateContactArrow(isVisible)
}

function isContactsVisible() {
    return contactMeSocials.getAttribute("isVisible")
}

function showContacts() {
    contactMeSocials.style.display = "flex"
}

function hideContacts() {
    contactMeSocials.style.display = "none"
}

function changeContactVisibilityAttribute (currentState) {
    if (currentState == "true") {
        var newState = "false"
    } else {
        var newState = "true"
    }
    contactMeSocials.setAttribute("isVisible", newState)
}

function rotateContactArrow(isVisible) {
    if (isVisible == "false") {
        var rotateDeg = -90
    } else {
        var rotateDeg = 0
    }

    homeContactMeButtonIcon1.style.transform = `rotate(${rotateDeg}deg)`
    homeContactMeButtonIcon2.style.transform = `rotate(${rotateDeg}deg)`
}


//side bar
const sectionHome = document.querySelector("#home")
const sectionProjects = document.querySelector("#projects")
const sectionExperience = document.querySelector("#experience")
const sectionEducation = document.querySelector("#education")
const sectionAboutMe = document.querySelector("#aboutMe")
const sectionContactMe = document.querySelector("#contactMe")

const sideNavHome = document.querySelector("#sideNavHome")
const sideNavProjects = document.querySelector("#sideNavProjects")
const sideNavExperience = document.querySelector("#sideNavExperience")
const sideNavEducation = document.querySelector("#sideNavEducation")
const sideNavAboutMe = document.querySelector("#sideNavAboutMe")
const sideNavContactMe = document.querySelector("#sideNavContactMe")

const headerNavHome = document.querySelector("#headerHome")
const headerNavProjects = document.querySelector("#headerProjects")
const headerNavExperience = document.querySelector("#headerExperience")
const headerNavEducation = document.querySelector("#headerEducation")
const headerNavAboutMe = document.querySelector("#headerAboutMe")
const headerNavContactMe = document.querySelector("#headerContactMe")


// section id: section element, section button
const pageSections = {
    "home": [sectionHome, sideNavHome],
    "projects": [sectionProjects, sideNavProjects],
    "experience": [sectionExperience, sideNavExperience],
    "education": [sectionEducation, sideNavEducation],
    "aboutme": [sectionAboutMe, sideNavAboutMe],
    "contactme": [sectionContactMe, sideNavContactMe]
}

const navButtonsSide = [sideNavHome, sideNavProjects, sideNavExperience, sideNavEducation, sideNavAboutMe, sideNavContactMe]
const navButtonsHeader = [headerNavHome, headerNavProjects, headerNavExperience, headerNavEducation, headerNavAboutMe, headerNavContactMe]


function sideNavControl(e) {
    var sectionName = e.target.id.slice(7).toLowerCase()
    
    hideAllSections()

    showSection(sectionName)
    
    hideNavButtons()

    showNavButton(sectionName)
}

function headerNavControl(e) {
    var sectionName = e.target.id.slice(6).toLowerCase()
    isMobileState = getIsMobileAttribute()

    if (isMobileState == "false") {
        hideAllSections()

        showSection(sectionName)
        
        hideNavButtons()

        showNavButton(sectionName)

    } else {
        scrollToSection(sectionName)
    }
}

function hideAllSections() {
    for (var key in pageSections) {
        pageSections[key][0].style.display = "none"
    }
}

function showSection(sectionName) {
    pageSections[sectionName][0].style.display = "flex"
}

function scrollToSection(sectionName) {
    pageSections[sectionName][0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
}

function hideNavButtons() {
    for (var key in pageSections) {
        pageSections[key][1].setAttribute("isActive", "false")
    }
}

function showNavButton(sectionName) {
    pageSections[sectionName][1].setAttribute("isActive", "true")
}


// PROJECTS SECTiON




// EXPERiENCE SECTiON

// change summary button position
const plateSummaryButton = document.querySelector(".plateShadow details summary")


plateSummaryButton.addEventListener("click", (e) => {changeSummaryButton(e)})

function changeSummaryButton(e) {
    let showMoreContainer = e.target
    let showMoreState = getShowMoreState(showMoreContainer)

    changeShowMoreText(showMoreContainer, showMoreState)

    rotateShowMoreIcon(showMoreContainer, showMoreState)

}

function changeShowMoreText(showMoreContainer, isVisible) {
    if (isVisible == "false") {
        showMoreContainer.innerHTML = "Show less <img src='img/icons/other/show-more-icon.svg' alt='arrow icon'>"
    } else {
        showMoreContainer.innerHTML = "Show more <img src='img/icons/other/show-more-icon.svg' alt='arrow icon'>"
    } 
}

function getShowMoreState(showMoreContainer) {
    return showMoreContainer.getAttribute("isActive")
}

function rotateShowMoreIcon(showMoreContainer, isActive) {
    if (isActive == "false") {
        var rotateDeg = 180
    } else {
        var rotateDeg = 0
    }
    showMoreContainer.children[0].style.transform = `rotate(${rotateDeg}deg)`
    changeShowMoreVisibilityAttribute(showMoreContainer, isActive)
}

function changeShowMoreVisibilityAttribute(showMoreContainer, isActive) {
    if (isActive == "false") {
        var attributeValue = "true"
    } else {
        var attributeValue = "false"
    }

    showMoreContainer.setAttribute("isActive", attributeValue)
}


// ABOUT ME
const aboutMeChangingText = document.querySelector("#aboutMeChangingText")

async function changingAboutMeTextFunction() {
    professions = ["Web-Developer", "Graphic-Designer", "Web-Designer", "Telegram-Bot-Developer"]
    for (profession of professions) {
        aboutMeChangingText.innerHTML = ""
        await changingAboutMeText(profession)
    }
    await changingAboutMeTextFunction()
}

async function changingAboutMeText(currentState) {
    for (let i = 0; i < currentState.length; i++) {
        aboutMeChangingText.innerText += currentState.charAt(i)
        await sleep(100)
    }
    await sleep(1000)
}


// CONTACT ME
const contactMeButtons = document.getElementsByClassName("contactMeButton") 

function contactMeRouting() {
    let isMobileState = getIsMobileAttribute()

    if (isMobileState == 'false') {
        hideAllSections()
        pageSections["contactme"][0].style.display = "flex"
        hideNavButtons()
        pageSections["contactme"][1].setAttribute("isActive", "true")
    } else {
        scrollToSection("contactme")
    }
}

// MOBILE ADAPTATiON

const sectionMain = document.querySelector("section.main")

window.addEventListener("resize", () => {
    rem = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, 2))

    let windowWidth = Number(window.innerWidth) / rem
    let isMobileSite = getIsMobileAttribute()

    if (windowWidth <= 40.625 && isMobileSite == "false") {
        adaptationMobile()
    } else if (windowWidth > 40.625 && isMobileSite == "true") {
        adaptationPC()
    }

    setTopMargin(isMobileSite)
})


function isMobile() {
    // if (window.innerWidth <= 650) {
    rem = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, 2))

    if (window.innerWidth / rem <= 40.625) {
        return true
    } else {
        return false
    }
}

function getIsMobileAttribute() {
    return body.getAttribute("isMobile")
}

function setSiteState(isMobileSite) {
    body.setAttribute("isMobile", isMobileSite)
}

function setTopMargin(isMobileState) {
    if (isMobileState == "true") {
        var marginTopValue = "5rem"
    } else {
        var marginTopValue = "6.25rem"
    }

    sectionMain.style.marginTop = marginTopValue
}

function adaptationMobile() {
    setSiteState("true")

    for (var key in pageSections) {
        pageSections[key][0].style.display = "flex"
    }
}

function adaptationPC() {
    setSiteState("false")

    for (var key in pageSections) {
        pageSections[key][0].style.display = "none"
    }
    sectionHome.style.display = "flex"

    hideNavButtons()
    showNavButton("home")
}