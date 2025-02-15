from aiogram import Bot, Dispatcher
import asyncio, os
from os.path import join, dirname
from dotenv import load_dotenv 

# .ENV
load_dotenv(join(dirname(__file__), "../", ".env"))
BOT_TOKEN = os.getenv("BOT_TOKEN")

# MiDDLEWARE
from middleware.is_admin import AdminMiddleware

# ROUTERS
from handlers.commands import commands_router

# BOT START
async def start():
    bot: Bot = Bot(token=BOT_TOKEN)
    dp: Dispatcher = Dispatcher()

    # MiDDLEWARE
    dp.message.middleware(AdminMiddleware())

    # ROUTERS
    dp.include_routers(
        commands_router,
    )

    # DELETiNG WEB HOOK
    print('bot is running')
    try:
        await bot.delete_webhook(drop_pending_updates=True)
        await dp.start_polling(bot)
        print('bot is not running anymore')
    finally:
        await bot.session.close()


# POLLiNG
if __name__ == "__main__":
    asyncio.run(start())
