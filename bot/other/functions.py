from aiogram import types, Bot
from pathlib import Path

# async def delete_previous_keyboard(msg: types.Message, bot: Bot):
async def delete_previous_keyboard(msg: types.Message):
    """Deletes previous message's keyboard to escape errors"""

    bot = msg.chat.bot
    previous_message_id = msg.message_id - 1 
    chat_id = msg.chat.id

    try:
        await bot.edit_message_reply_markup(
            chat_id = chat_id,
            message_id = previous_message_id,
            reply_markup = None
        )
        
    except Exception:
        pass


async def send_final_project(msg: types.Message, data):
    """Sends final project data, firstly on english then on russian"""
    
    project_type = data["project_type"]
    project_name = data["project_name"]
    project_img = data["project_img"]
    project_description = data["project_description"]
    project_content_counter = int(data["counter"])
    project_content = {f"content{i+1}": data[f"content{i+1}"] for i in range(project_content_counter)}

    for i in range(2):
        await msg.answer_document(
            document = project_img[i],
            caption = f"Project type: {project_type}\nProject name: {project_name[i]}\nProject description: {project_description[i]}"
        )
        for content in project_content.items():
            content_current = content[1][i]
            content_type = content_current[1]
            content_content = content_current[0]

            if content_type == "jpg":
                await msg.answer_document(
                    document = content_content,
                )
            else:
                await msg.answer(
                    text = content_content
                )
        

async def save_content_img(bot: Bot, data):
    """Saves content images to a folder"""

    project_type = data["project_type"]
    project_name = data["project_name"]
    project_img = data["project_img"]
    project_content_counter = int(data["counter"])
    project_content = {f"content{i+1}": data[f"content{i+1}"] for i in range(project_content_counter)}

    for i in range(2):
        file_id = project_img[i]

        path = Path(f"public/img/projects/{project_type}/{(project_name[0].replace(' ', '-'))[0:15]}/{['en', 'ru'][i]}/")
        path_preview = Path.joinpath(path, "preview.jpg")

        try:
            path.mkdir(parents=True, exist_ok=True)
            print(f'Directories "{path}" created.')
        except Exception as e:
            print(f'An error occurred: {e}')

        await bot.download(
            file = file_id,
            destination = path_preview
        )

        # project_img[i] = f"./content_images/{project_name[i]}.jpg"
        # for content in project_content.items():
        #     content_current = content[1][i]
        #     content_type = content_current[1]
        #     content_content = content_current[0]