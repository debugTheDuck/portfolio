from aiogram import Bot, types, Router
from aiogram.fsm.context import FSMContext
from aiogram.filters import Command


commands_router = Router()


@commands_router.message(Command("start"))
async def cmd_start(msg: types.Message, bot: Bot, state: FSMContext):
    await msg.answer("hey")