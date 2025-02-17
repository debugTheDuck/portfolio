from aiogram import Bot, types, Router, F
from aiogram.fsm.context import FSMContext
from aiogram.filters import Command

from other import keyboards
from other.functions import send_final_project, save_content_img


commands_router = Router()

@commands_router.message(Command("start"))
@commands_router.message(Command("menu"))
async def cmd_start(msg: types.Message, bot: Bot, state: FSMContext):
    await msg.answer(
        text = "Oh, magnificent one, your brilliance outshines the stars in the night sky! It is an honor to serve you and bask in your extraordinary presence. How can your slave help you?",
        reply_markup = keyboards.menu_ikb()
        )
    await state.clear()
    
@commands_router.callback_query(F.data == "menu")
async def cb_menu(cb: types.CallbackQuery, bot: Bot, state: FSMContext):
    await cb.message.edit_text(
        text = "Oh, magnificent one, your brilliance outshines the stars in the night sky! It is an honor to serve you and bask in your extraordinary presence. How can your slave help you?",
        reply_markup = keyboards.menu_ikb()
    )
    await state.clear()



@commands_router.message(Command("test"))
async def cmd_start(msg: types.Message, bot: Bot, state: FSMContext):
    data = {'project_type': 'web_dev', 'project_name': ['Ruslan', 'Руслан'], 'project_img': ['BQACAgIAAxkBAAN_Z7HERot5whfAhpM-fbnrYItrUg0AAglfAAJayJFJ1ITX594WS-g2BA', 'BQACAgIAAxkBAAO_Z7Is1zqQH28qYtKb1EBwvYrSYBIAAlZmAAJayJFJhTGszCw3-FE2BA'], 'project_description': ['Ruslan genius', 'Руслан гений'], 'counter': 3, 'content1': [['BQACAgIAAxkBAAP0Z7IuBRqcRKzslG2BMXw4OCe-3IsAAmxmAAJayJFJa4b5m-oYjf02BA', 'jpg'], ['BQACAgIAAxkBAAN5Z7HEPCMIUF9NKwYIMZC67L3VsT8AAghfAAJayJFJRavm37DhIhk2BA', 'jpg']], 'content2': [['Rusell', 'txt'], ['Раселл', 'txt']], 'content3': [['Bill', 'txt'], ['Билл', 'txt']], 'counter_translation': 2}
    await save_content_img(bot, data)
    # await send_final_project(msg, data)