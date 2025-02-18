// ONLOAD FUNCTION
window.addEventListener("load", (event) => {
    console.log("page is fully loaded")
    let displayTheme = localStorage.getItem("displayTheme") || "light"
    changeDisplayTheme(displayTheme)

    let isMobileSite = isMobile()
    setSiteState(isMobileSite)
    let isMobileState = getIsMobileAttribute()

    setTopMargin(isMobileState)

    if (isMobileState == "true") {
        adaptationMobile()
    } else {
        adaptationPC()
    }

    const language = localStorage.getItem("language")
    if (language) {
        changeLanguage(language)
    }

    addListeners()

    changingAboutMeTextFunction()
})

const HOST_ROUTE = "http://localhost:7777" // change this

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
    
    projectsControl()
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


// DISPLAY CHANGiNG
const body = document.querySelector("body")
const headerDisplayModeButton = document.querySelector("#headerDisplayModeButton")
const sideNavDisplayModeButton = document.querySelector("#sideNavDisplayModeButton")


headerDisplayModeButton.addEventListener('click', function () {changeDisplayThemeFunction()})
sideNavDisplayModeButton.addEventListener('click', function () {changeDisplayThemeFunction()})


function changeDisplayThemeFunction() {
    currentTheme = getCurrentDisplayTheme()

    if (currentTheme == "light") {
        var newTheme = "dark"
    } else {
        var newTheme = "light"
    }

    changeDisplayTheme(newTheme)
}


function changeDisplayTheme (mode) {
    localStorage.setItem("displayTheme", mode)

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


// TRANSLATION
// translation dictionary
const translations = {
    en: {
        "cv-heading": "Choose CV language:",
        "home-nav": 'Home<img id="sideImgHome" src="img/icons/side-nav/home-icon.svg" alt="home icon">',
        "projects-nav": '<img id="sideImgProjects" src="img/icons/side-nav/folder-icon.svg" alt="folder icon">Projects',
        "experience-nav": 'Experience<img  id="sideImgExperience" src="img/icons/side-nav/case-icon.svg" alt="brief-case icon">',
        "education-nav": '<img  id="sideImgEducation" src="img/icons/side-nav/education-icon.svg" alt="education icon">Education',
        "about-me-nav": 'About me<img id="sideImgAboutMe" src="img/icons/side-nav/person-icon.svg" alt="person icon">',
        "contact-me-nav": '<img  id="sideImgContactMe" src="img/icons/side-nav/mail-icon.svg" alt="mail icon">Contact me',
        "home": "Home",
        "projects": "Projects",
        "experience": "Experience",
        "education": "Education",
        "about-me": "About me",
        "contact-me": "Contact me",
        "language-indicator": "En",
        "home-heading": "Ruslan Abduramanov",
        "home-bio": "<em>Front-end Web-Developer</em>, <em>Graphic-Designer</em>, <em>Web-Designer</em><br>Uzbekistan, Tashkent<br> 20-year-old",
        "contact-me-button": 'Contact me<img id="homeContactMeButtonIcon1" src="img/icons/button-icons/arrow-in-circle-icon.svg" alt="arrow in circle icon">',
        "download-cv": 'Download CV<img src="img/icons/button-icons/download-icon.svg" alt="download icon">',
        "contact-me-hyperlink": 'Contact me <img src="img/icons/other/go-to-arrow-icon.svg" alt="arrow icon">',
        "contact-me-contact": "Contact me",
        "home-tech-stack": "Tech Stack",
        "experience-heading": "Experience",
        "offer-job": "Nowadays I have no full-time job, so I'm opened for job offers. ",
        "experience-arkad-audit-date": "2024 Nov - 2025 Feb",
        "experience-arkad-audit": "Arkad Audit - Consulting Company",
        "experience-arkad-audit-position": "Full-stack Web-Developer, Web-Designer, Telegram Bot-Developer",
        "show-more": 'Show more <img src="img/icons/other/show-more-icon.svg" alt="arrow icon">',
        "show-less": 'Show less <img src="img/icons/other/show-more-icon.svg" alt="arrow icon" style="transform: rotate(180deg)">',
        "arkad-audit-details-1": "Made a project for optimization of business processes within the company and attraction of new customers using website and Telegram Bots.",
        "arkad-audit-details-2": "Redesigned the previous primitive website",
        "arkad-audit-details-3": "Made Front-end and Backend of ",
        "arkad-audit-details-4": 'website <img src="img/icons/other/go-to-arrow-icon.svg" alt="arrow icon">',
        "arkad-audit-details-5": "Made Telegram Bot for optimization of inner processes",
        "arkad-audit-details-6": "Made ",
        "arkad-audit-details-7": 'Telegram-Bot <img src="img/icons/other/go-to-arrow-icon.svg" alt="arrow icon">',
        "arkad-audit-details-8": "for customers:",
        "arkad-audit-details-9": "Consultation through the chat, registration for a consultation",
        "arkad-audit-details-10": "List of services, price calculator",
        "arkad-audit-details-11": "Database collection",
        "arkad-audit-details-12": "Contacts, submitting of job applications, leaving review, etc",
        "education-heading": "Education",
        "education-subheading": "Mostly I'm self-taught specialist with a great intention of learning. ",
        "education-synergy-date": "2024 Nov - 2029 Mar",
        "education-synergy": "Synergy University (online-education)",
        "education-faculty-1": "Information Systems and Technology.",
        "education-faculty-2": "Web-development",
        "projects-heading": "Projects",
        "projects-subheading": "Choose which portfolio do you want to watch:",
        "alternative-view": 'Alternative view <img src="img/icons/button-icons/eye-icon.svg" alt="eye icon" style="display: inline-block"><img src="img/icons/button-icons/eye-off-icon.svg" alt="eye icon" style="display: none;">',
        "about-me-heading": "About me",
        "about-me-subheading-1": "I'm Ruslan 20-year old ",
        "about-me-subheading-2": "from Uzbekistan also known as ",
        "about-me-languages": "Languages I speak",
        "about-me-languages-ru": "Russian Native",
        "about-me-languages-en": "English B2+",
        "about-me-languages-uz": "Uzbek B2",
        "about-me-languages-pol": "Polish A2",
        "about-me-employment": "Employment type preferences",
        "about-me-employment-web-development": "Web-Developer:",
        "about-me-employment-graphic-design": "Graphic-Designer:",
        "about-me-employment-web-design": "Web-designer:",
        "about-me-employment-remote": "Remote",
        "about-me-employment-office": "Office",
        "about-me-employment-full-time": "Full-time",
        "about-me-employment-contract": "Contract",
        "about-me-employment-part-time": "Part-time",
        "about-me-socials": "My personal socials",
        "about-me-hobbies": "Hobbies",
        "about-me-hobbies-basketball": "Basketball",
        "hobbies-basketball-title": "2024 Республиканская Молодёжная Лига 2ое место\n2023 Республиканская Молодёжная Лига 2ое место, \n2022 Республиканская Молодёжная Лига 2ое место, \n2022 Uzbekistan 3x3 School League 1st place, \n2019 Republic 3x3 League 2nd place, \nLots of 3x3 wins through last 5 years",
        "hobbies-cs2-title": "Nothing special...",
    },

    ru: {
        "cv-heading": "Выберите язык резюме:",
        "home-nav": 'Главная<img id="sideImgHome" src="img/icons/side-nav/home-icon.svg" alt="home icon">',
        "projects-nav": '<img  id="sideImgProjects" src="img/icons/side-nav/folder-icon.svg" alt="folder icon">Проекты',
        "experience-nav": 'Опыт<img  id="sideImgExperience" src="img/icons/side-nav/case-icon.svg" alt="brief-case icon">',
        "education-nav": '<img  id="sideImgEducation" src="img/icons/side-nav/education-icon.svg" alt="education icon">Обучение',
        "about-me-nav": 'Обо мне<img id="sideImgAboutMe" src="img/icons/side-nav/person-icon.svg" alt="person icon">',
        "contact-me-nav": '<img  id="sideImgContactMe" src="img/icons/side-nav/mail-icon.svg" alt="mail icon">Контакты',
        "contact-me-contact": "Контакты",
        "home": "Главная",
        "projects": "Проекты",
        "experience": "Опыт",
        "education": "Обучение",
        "about-me": "Обо мне",
        "contact-me": "Свяжитесь со мной",
        "language-indicator": "Ру",
        "home-heading": "Руслан Абдураманов",
        "home-bio": "<em>Фронтенд Веб-разработчик</em>, <em>Графический дизайнер</em>, <em>Веб-дизайнер</em><br>Узбекистан, Ташкент<br> 20 лет",
        "contact-me-button": 'Контакты<img id="homeContactMeButtonIcon1" src="img/icons/button-icons/arrow-in-circle-icon.svg" alt="arrow in circle icon">',
        "download-cv": 'Скачать CV<img src="img/icons/button-icons/download-icon.svg" alt="download icon">',
        "contact-me-hyperlink": 'Свяжитесь со мной <img src="img/icons/other/go-to-arrow-icon.svg" alt="arrow icon">',
        "home-tech-stack": "Tech Stack",
        "experience-heading": "Опыт",
        "offer-job": "Сейчас у меня нет работы и я открыт к предложениям. ",
        "experience-arkad-audit-date": "2024 Ноя- 2025 Фев",
        "experience-arkad-audit": "Arkad Audit",
        "experience-arkad-audit-position": "Фуллстак Веб-разработчик, Веб-дизайнер, Разработчик Телеграм ботов",
        "show-more": 'Подробнее  <img src="img/icons/other/show-more-icon.svg" alt="arrow icon">',
        "show-less": 'Скрыть  <img src="img/icons/other/show-more-icon.svg" alt="arrow icon" style="transform: rotate(180deg)">',
        "arkad-audit-details-1": "Сделал проект для оптимизации внутренних процессов компании и привлечения новых пользователей с помощью сайт и телеграм ботов",
        "arkad-audit-details-2": "Сделал редизайн предыдущего примитивного веб-сайта",
        "arkad-audit-details-3": "Сделал фронтенд и бэкенд нового ",
        "arkad-audit-details-4": 'сайта <img src="img/icons/other/go-to-arrow-icon.svg" alt="arrow icon"> ',
        "arkad-audit-details-5": "Сделал Телеграм бота для оптимизаици процессов внутри компании",
        "arkad-audit-details-6": "Сделал ",
        "arkad-audit-details-7": 'Телеграм бота <img src="img/icons/other/go-to-arrow-icon.svg" alt="arrow icon"> ',
        "arkad-audit-details-8": "для клиентов:",
        "arkad-audit-details-9": "Консультация через чат, запись на коснультацию",
        "arkad-audit-details-10": "Список услуг, калькулятор цен для них",
        "arkad-audit-details-11": "Сбор базы данныз",
        "arkad-audit-details-12": "Контакты, подача заявления на работу, возможность оставить отзыв о компании и тд",
        "education-heading": "Обучение",
        "education-subheading": "По большей части я самоучка, с большим рвением к знаниям. ",
        "education-synergy-date": "2024 Ноя - 2029 Мар",
        "education-synergy": "Университет Синергия (онлайн-обучение)",
        "education-faculty-1": "Информационные системы и технология. ",
        "education-faculty-2": "Веб-разработка",
        "projects-heading": "Проекты",
        "projects-subheading": "Выберите портфолио которое хотите посмотреть: ",
        "alternative-view": 'Альтернативный вид <img src="img/icons/button-icons/eye-icon.svg" alt="eye icon" style="display: inline-block"><img src="img/icons/button-icons/eye-off-icon.svg" alt="eye icon" style="display: none;">',
        "projects-portfolio-heading": "",
        "about-me-heading": "Обо мне",
        "about-me-subheading-1": "Я Руслан - 20 летний ",
        "about-me-subheading-2": "из Узбекистана, также известный как ",
        "about-me-languages": "Языки на которых я говорю",
        "about-me-languages-ru": "Русский Родной",
        "about-me-languages-en": "Английский B2+",
        "about-me-languages-uz": "Узбекский B2",
        "about-me-languages-pol": "Польский A2",
        "about-me-employment": "Предпочтения по типу занятости",
        "about-me-employment-web-development": "Веб-разработчик",
        "about-me-employment-graphic-design": "Графический дизайнер",
        "about-me-employment-web-design": "Веб-дизайнер",
        "about-me-employment-remote": "Удалённая",
        "about-me-employment-office": "Офис",
        "about-me-employment-full-time": "Полный день",
        "about-me-employment-contract": "Контракт",
        "about-me-employment-part-time": "Неполный день",
        "about-me-socials": "Личные соцсети",
        "about-me-hobbies": "Хобби",
        "about-me-hobbies-basketball": "Баскетбол",
        "hobbies-basketball-title": "2024 Республиканская Молодёжная Лига 2ое место\n2023 Республиканская Молодёжная Лига 2ое место, \n2022 Республиканская Молодёжная Лига 2ое место, \n2022 Узбекистанская Школьная Лига 3x3 1ое место, \n2019 Республиканская Лига 3x3 2ое место, \nМножество побед 3x3 за последние 5 лет",
        "hobbies-cs2-title": "Ничего особенного...",
    },
}


// elements and functions
const headerSwitchEn = document.querySelector("#languageHeaderEn")
const headerSwitchRu = document.querySelector("#languageHeaderRu")
const sidebarSwitch = document.querySelector("#sideNavDisplaySwitch")

const translationElements = document.querySelectorAll("[data-translation]")

const hobbyBasketball = document.getElementById("hobbyBasketball")
const hobbyCS2 = document.getElementById("hobbyCS2")

headerSwitchEn.addEventListener("click", function () {changeLanguage("en")}) 
headerSwitchRu.addEventListener("click", function () {changeLanguage("ru")}) 


function changeLanguage(language) {
    let sidebarSwitchEn = document.querySelector("#languageEnSegment")
    let sidebarSwitchRu = document.querySelector("#languageRuSegment")
    translationElements.forEach(translationElement => {
        try{
            translationElement.innerHTML = translations[language][translationElement.getAttribute("data-translation")] || translationElement.innerHTML
        } catch(err) {
        }
    })


    if (language == "ru") {
        // chrome ad block for some reason raises error while running .removeAttribute function, so I should use some funky way to change language switch (:
        // sidebarSwitchEn.removeAttribute("checked")
        // sidebarSwitchRu.setAttribute("checked")
        sidebarSwitch.innerHTML = '<input id="languageEnSegment" value="en" name="languageSegmentInput" type="radio"><label for="languageEnSegment">En</label><input id="languageRuSegment" value="ru" name="languageSegmentInput" type="radio" checked><label for="languageRuSegment">Ру</label>'
    } else {
        sidebarSwitch.innerHTML = '<input id="languageEnSegment" value="en" name="languageSegmentInput" type="radio" checked><label for="languageEnSegment">En</label><input id="languageRuSegment" value="ru" name="languageSegmentInput" type="radio"><label for="languageRuSegment">Ру</label>'
    }
    changeProjectsPreview(language)

    sidebarSwitchEn = document.querySelector("#languageEnSegment")
    sidebarSwitchRu = document.querySelector("#languageRuSegment")

    sidebarSwitchEn.addEventListener("click", function () {changeLanguage("en")}) 
    sidebarSwitchRu.addEventListener("click", function () {changeLanguage("ru")}) 

    translateAttributes(language)
    translateChangingText(language)
    localStorage.setItem("language", language)
}

const projectPreviewsEn = [document.getElementById("webDevEn"), document.getElementById("graphDesignEn"), document.getElementById("webDesignEn"), document.getElementById("sideProjectsEn")]
const projectPreviewsRu = [document.getElementById("webDevRu"), document.getElementById("graphDesignRu"), document.getElementById("webDesignRu"), document.getElementById("sideProjectsRu")]

function changeProjectsPreview(language) {
    if (language == "en") {
        projectPreviewsEn.forEach(projectPreview => {
            projectPreview.style.display = "block"
        })
        projectPreviewsRu.forEach(projectPreview => {
            projectPreview.style.display = "none"
        })
    } else {
        projectPreviewsRu.forEach(projectPreview => {
            projectPreview.style.display = "block"
        })
        projectPreviewsEn.forEach(projectPreview => {
            projectPreview.style.display = "none"
        })
    }
}

function translateAttributes(language) {
    hobbyBasketball.setAttribute("title", translations[language]["hobbies-basketball-title"])
    hobbyCS2.setAttribute("title", translations[language]["hobbies-cs2-title"])
}

function translateChangingText(language) {
    if (language == "en") {
        professions = ["Web-Developer", "Graphic-Designer", "Web-Designer", "Telegram-Bot-Developer"]
    } else {
        professions = ["Веь-разработчик", "Графический-дизайнер", "Веб-дизайнер", "Разработчик-Телеграм-Ботов"]
    }
}


// HOME SECTiON

// hide CVs
const CVLanguageWrapper = document.querySelector(".CVLanguageWrapper")
const showCVs = document.querySelectorAll(".showCV")
CVLanguageWrapper.addEventListener("click", changeCVChoosingAttribute)
showCVs.forEach(showCV => {
    showCV.addEventListener("click", changeCVChoosingAttribute)
})

function changeCVChoosingAttribute() {
    let currentState = CVLanguageWrapper.getAttribute("isActive")
    if (currentState == "true") {
        var newState = "false"
    } else {
        var newState = "true"
    }

    CVLanguageWrapper.setAttribute("isActive", newState)
}

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

// get projects
const webDevButtons = [document.getElementById("webDevEn"), document.getElementById("webDevRu")]
const webDesignButtons = [document.getElementById("webDesignEn"), document.getElementById("webDesignRu")]
const graphDesignButtons = [document.getElementById("graphDesignEn"), document.getElementById("graphDesignRu")]
const sideProjectsButtons = [document.getElementById("sideProjectsEn"), document.getElementById("sideProjectsRu")]
const projectButtons = [webDevButtons, webDesignButtons, graphDesignButtons, sideProjectsButtons]

const projectsURL = {
    "webDev": "/web-development",
    "webDesign": "/web-design",
    "graphDesign": "/graphic-design",
    "sideProjects": "/side-projects",
}

function projectsControl() {
    for (let projectTypeButtons of projectButtons) {
        for (let button of projectTypeButtons) {
            button.addEventListener("click", function() {goToProjectPage(button.id.slice(0, button.id.length - 2))})
        }
    }
}

function goToProjectPage(keyToUrl) {
    console.log(keyToUrl)
    var goToUrl = projectsURL[keyToUrl]
    window.location.href = `${HOST_ROUTE}/projects${goToUrl}`
}


// EXPERiENCE SECTiON

// change summary button position
const plateSummaryButton = document.querySelector(".plateShadow details summary")

plateSummaryButton.addEventListener("click", (e) => {changeSummaryButton(e)})

function changeSummaryButton(e) {
    let showMoreContainer = e.target
    let showMoreState = getShowMoreState(showMoreContainer)

    changeShowMoreText(showMoreContainer, showMoreState)

    rotateShowMoreIcon(showMoreContainer, showMoreState)

    changeShowMoreTranslation(showMoreState)
}

function changeShowMoreText(showMoreContainer, isVisible) {
    currentLanguage = localStorage.getItem("language") || "en"
    if (isVisible == "false") {
        if (currentLanguage == "en"){
            content = "Show less <img src='img/icons/other/show-more-icon.svg' alt='arrow icon'>"
        } else {
            content = "Скрыть <img src='img/icons/other/show-more-icon.svg' alt='arrow icon'>"
        }
    } else {
        if (currentLanguage == "en"){
            content = "Show more <img src='img/icons/other/show-more-icon.svg' alt='arrow icon'>"
        } else {
            content = "Подбробнее <img src='img/icons/other/show-more-icon.svg' alt='arrow icon'>"
        }
    } 
    showMoreContainer.innerHTML = content
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

function changeShowMoreTranslation(isActive) {
    if (isActive == "false") {
        var attributeValue = "show-less"
    } else {
        var attributeValue = "show-more"
    }
    plateSummaryButton.setAttribute("data-translation", attributeValue)
}


// ABOUT ME
const aboutMeChangingText = document.querySelector("#aboutMeChangingText")
var professions = ["Web-Developer", "Graphic-Designer", "Web-Designer", "Telegram-Bot-Developer"]


async function changingAboutMeTextFunction() {
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

    setTopMargin("true")
}

function adaptationPC() {
    setSiteState("false")

    for (var key in pageSections) {
        pageSections[key][0].style.display = "none"
    }
    sectionHome.style.display = "flex"

    hideNavButtons()
    showNavButton("home")

    setTopMargin("false")
}

