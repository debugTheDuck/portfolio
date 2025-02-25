from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.context import FSMContext
from aiogram import Bot, Router, types, F
import asyncio, os
from os.path import join, dirname
from dotenv import load_dotenv 

from other import keyboards
from databases import db_projects
from other.functions import delete_previous_keyboard, save_content_img ,send_final_project

load_dotenv(join(dirname(__file__), "../", "../", ".env"))
RULES_LINK = os.getenv("RULES_LINK")
PORTFOLIO_LINK = "http://localhost:7777" # CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

# data should be in this format [
# PROJECT_TYPE # web_dev, web_design, graph_design or side_projects
# PROJECT_NAME # might include <a href="" class="hyperlink">NAME OF PROJECT</a> # [en, ru]
# PREVIEW_PATH # if not included, searching for PROJECT_NAME.jpg # [en, ru]
# DESCRIPTION # text # [en, ru]
# CONTENT # should be in this format [["TEXT", "txt"], ["IMAGE_ID", "jpg"], ["HTML", "html"], ...] 
# ]

class ProjectsAddFSM(StatesGroup):
    project_type = State()
    project_name = State()
    project_img = State()
    project_description = State()
    project_content = State()
    project_name_translation = State()
    project_img_translation = State()
    project_description_translation = State()
    project_content_translation = State()
    
class ProjectsDeleteFSM(StatesGroup):
    change_the_name = State()

class ProjectsEditFSM(StatesGroup):
    change_the_name = State()
 

FSM_projects_router = Router()


# PROJECTS ADD STATE
@FSM_projects_router.callback_query(ProjectsAddFSM.project_type)  # PROJECTS TYPE ROUTiNG
@FSM_projects_router.callback_query(F.data.startswith("projects_add_type_"))
async def cb_router_projects_add_type(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    project_type = cb.data[18:]

    await cb.message.edit_text(
        text = "Enter project name: ",
        reply_markup = keyboards.projects_add_back_ikb("project_type")
    )

    await state.update_data(project_type = project_type)
    await state.set_state(ProjectsAddFSM.project_name)


@FSM_projects_router.message(ProjectsAddFSM.project_name) # PROJECT NAME
async def fsm_projects_add_name(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)

    project_name = msg.text

    await msg.answer(
        text = "Send project preview as a file",
        reply_markup = keyboards.projects_add_back_ikb("project_name")
    )

    await state.update_data(project_name = project_name)
    await state.set_state(ProjectsAddFSM.project_img)


@FSM_projects_router.message(ProjectsAddFSM.project_img) # PROJECT PREVIEW
async def fsm_projects_add_preview(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)

    if msg.content_type != "document":
        await msg.answer(
            text = "You should send img as file!",
            reply_markup = None
        )

        await asyncio.sleep(2)

        await msg.answer(
            text = "Send project preview as a file",
            reply_markup = keyboards.projects_add_back_ikb("project_img")
        )
        return

    file_id = msg.document.file_id

    await msg.answer(
        text = "Now send me a short description of your project:",
        reply_markup = keyboards.projects_add_back_ikb("project_img")
    )

    await state.update_data(project_img = file_id)
    await state.set_state(ProjectsAddFSM.project_description)


@FSM_projects_router.message(ProjectsAddFSM.project_description) # PROJECT DESCRiPTiON
async def fsm_projects_add_description(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)

    description = msg.text

    await msg.answer(
        text = f"Send content according to <a href='{RULES_LINK}'>rules</a>",
        reply_markup = keyboards.projects_add_back_ikb("project_description"),
        parse_mode = "HTML"
    )

    await state.update_data(project_description = description)
    await state.set_state(ProjectsAddFSM.project_content)


@FSM_projects_router.callback_query(F.data == "projects_add_add_more") # ADD MORE CONTENT
async def cb_projects_add_add_more(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    await cb.message.edit_text(
        text = f"Send content according to <a href='{RULES_LINK}'>rules</a>", # CHANGE SiTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        reply_markup = keyboards.projects_add_back_ikb("project_description"),
        parse_mode = "HTML"
    )

    await state.set_state(ProjectsAddFSM.project_content)


@FSM_projects_router.message(ProjectsAddFSM.project_content) # PROJECT CONTENT
async def fsm_projects_add_content(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)

    if msg.content_type == "text":
        content_content = msg.text
        if content_content[0: 7].lower() == "!<html>":
            content_content = content.replace("</html>", "")
            content_type = "html"
        else:
            content_type = "txt"
        content = [content_content, content_type]

    elif msg.content_type == "document":
        file_id = msg.document.file_id
        content = [file_id, "jpg"]

    else:
        await msg.answer(
            text = f"You should send content according to <a href='{RULES_LINK}'>rules</a>",
            reply_markup = keyboards.projects_add_back_ikb("project_content"),
            parse_mode = "HTML"
        )
        return
    
    await msg.answer(
        text = "You can add more content or leave it like that",
        reply_markup = keyboards.projects_add_accept_ikb()
    )
    
    data = await state.get_data()
    try:
        counter = int(data["counter"])
    except Exception:
        counter = 0

    counter += 1
    content_position = {f"content{counter}": content}

    await state.update_data(counter = counter)
    await state.update_data(content_position)
    await state.set_state(ProjectsAddFSM.project_content)


@FSM_projects_router.callback_query(F.data == "projects_add_accept") # PROJECT ACCEPTATION
async def cb_projects_add_accept(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    await cb.message.edit_text(
        text = "Here's content:",
        reply_markup = None
    )    

    data = await state.get_data()
    project_type = data["project_type"]
    project_name = data["project_name"]
    project_img = data["project_img"]
    project_description = data["project_description"]
    project_content_counter = int(data["counter"])
    project_content = {f"content{i+1}": data[f"content{i+1}"] for i in range(project_content_counter)}

    await cb.message.answer_document(
        document=project_img,
        caption = f"Project type: {project_type},\nProject_name: {project_name},\nProject_Description: {project_description}"
    )

    for i, (key, value) in enumerate(project_content.items(), start=1):
        if value[1] == "txt" or value[1] == "html":
            await cb.message.answer(
                text=value[0],
            )
        else:
            await cb.message.answer_document(
                document=value[0],
            )

    await cb.message.answer(
        text = "Start translation?",
        reply_markup = keyboards.projects_add_translation_start_ikb()
    )


# PROJECT TRANSLATiON START
@FSM_projects_router.callback_query(F.data == "projects_add_translation_start")
async def cb_projects_add_translation_start(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    data = await state.get_data()

    await cb.message.edit_text(
        text = f"Translate name of project. Initial name: {data['project_name']}"
    )

    await state.set_state(ProjectsAddFSM.project_name_translation)
    

@FSM_projects_router.message(ProjectsAddFSM.project_name_translation) # PROJECT NAME TRANSLATiON
async def fsm_projects_add_name_translation(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)
    name_translated = msg.text
    data = await state.get_data()

    await msg.answer(
        text = f"Send ru version of preview:"
    )
    
    name = [data["project_name"], name_translated]
    await state.update_data(project_name = name)
    await state.set_state(ProjectsAddFSM.project_img_translation)


@FSM_projects_router.message(ProjectsAddFSM.project_img_translation) # PROJECT PREVIEW TRANSLATiON
async def fsm_projects_add_preview_translation(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)
    data = await state.get_data()

    if msg.content_type != "document":
        await msg.answer(
            text = "You should send img as file!",
            reply_markup = None
        )

        await asyncio.sleep(2)

        await msg.answer(
            text = "Send project preview as a file",
        )
        return

    file_id_translated = msg.document.file_id

    await msg.answer(
        text = f"Translate this: {data['project_description']}",
    )

    project_img = [data["project_img"], file_id_translated]
    await state.update_data(project_img = project_img)
    await state.set_state(ProjectsAddFSM.project_description_translation)


@FSM_projects_router.message(ProjectsAddFSM.project_description_translation) # PROJECT DESCRiPTiON TRANSLATION
async def fsm_projects_add_description(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)
    data = await state.get_data()

    description_translated = msg.text

    # getting first project content to translate
    first_content = data["content1"]

    if first_content[1] != "jpg":
        await msg.answer(
            text = f"Translate first content:\n\n{first_content[0]}",
            reply_markup = keyboards.projects_add_back_ikb("project_description"),
            parse_mode = "HTML"
        )

    else:
        await msg.answer_document(
            document = first_content[0],
            caption = "Send ru version of this photo:"
        )

    project_description = [data["project_description"], description_translated]

    await state.update_data(project_description = project_description)
    await state.set_state(ProjectsAddFSM.project_content_translation)


@FSM_projects_router.message(ProjectsAddFSM.project_content_translation) # PROJECT CONTENT TRANSLATION
async def fsm_projects_add_content(msg: types.Message, bot: Bot, state: FSMContext):
    await delete_previous_keyboard(msg)
    data = await state.get_data()

    try:
        counter_translation = int(data["counter_translation"])
    except Exception:
        counter_translation = 0
    counter_translation += 1
    await state.update_data(counter_translation = counter_translation)
    counter = int(data["counter"])

    if msg.content_type == "text":
        content_content = msg.text
        if content_content[0: 7].lower() == "!<html>":
            content_content_type = "html"
        else:
            content_content_type = "txt"

    elif msg.content_type == "document":
        content_content = msg.document.file_id
        content_content_type = "jpg"

    else:
        await msg.answer(
            text = "You should send content as text or image!"
        )
        return

    current_translation = [content_content, content_content_type]
    content_without_translation = data[f"content{counter_translation}"]

    content_final = {f"content{counter_translation}": [content_without_translation, current_translation]}
    await state.update_data(content_final)


    # sending next content to translate
    upcoming_translation = data[f"content{counter_translation + 1}"]

    if upcoming_translation[1] != "jpg":
        await msg.answer(
            text = f"Translate this:\n\n{upcoming_translation[0]}",
            reply_markup = keyboards.projects_add_back_ikb("project_description"),
            parse_mode = "HTML"
        )
        
    else:
        await msg.answer_document(
            document = upcoming_translation[0],
            caption = "Send ru version of this photo:" 
        )

    await state.set_state(ProjectsAddFSM.project_content_translation)

    if counter_translation == counter:
        await msg.answer(text = "Translation completed!")
        await send_final_project(msg, data)
        await msg.answer(
            text = "Add project to database?",
            reply_markup = keyboards.projects_add_translation_accept_ikb())
        return


@FSM_projects_router.callback_query(F.data == "projects_add_translation_accept")
async def cb_projects_add_translation_accept(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    try:
        data = await state.get_data()
        new_data = await save_content_img(bot, data)
        unique_hash = await db_projects.get_hash(data["project_type"], data["project_name"])
        await db_projects.add_project(new_data)
        await cb.message.edit_text(
            text = f"Project was successfully added. You can watch it here:\n\n{PORTFOLIO_LINK}/projects/{data['project_type']}/en/{unique_hash}\n{PORTFOLIO_LINK}/projects/{data['project_type']}/ru/{unique_hash}",
            reply_markup = keyboards.projects_action_ikb()
        )

    except Exception as e:
        await cb.message.edit_text(
            text = f"Something went wrong: {e}"
        )

        await asyncio.sleep(2)

        await cb.message.answer(
            text = "Oh, my superior, what do you want to do with your glorious projects?",
            reply_markup = keyboards.projects_action_ikb()
        )



# PROJECT MENU
@FSM_projects_router.callback_query(F.data == "menu_projects") # CHOOSE PROJECT ACTION
async def cb_menu_projects(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    await cb.message.edit_text(
        text = "Oh, my superior, what do you want to do with your glorious projects?",
        reply_markup = keyboards.projects_action_ikb()
    )

@FSM_projects_router.callback_query(F.data.startswith("projects_")) # PROJECTS ROUTiNG
async def cb_router_projects(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    action = cb.data[9:]
    await state.clear()

    if action == "add":
        await state.set_state(ProjectsAddFSM.project_type)

        await cb.message.edit_text(
            text = "Choose type of project:",
            reply_markup = keyboards.projects_type_ikb()
        )

    elif action == "delete":
        pass

    elif action == "edit":
        pass

    elif action == "rules":
        pass

    elif action == "cancel":
        await cb.message.edit_text(
            text = "Changes were canceled, my lord",
            reply_markup = None
        )
        asyncio.sleep(2)
        await cb.message.edit_text(
            text = "Oh, my superior, what do you want to do with your glorious projects?",
            reply_markup = keyboards.projects_action_ikb()
        )
