import os
from os.path import join, dirname
from dotenv import load_dotenv

from typing import Any, Callable, Dict, Awaitable
from aiogram import Bot, Dispatcher, Router, BaseMiddleware, F, types
from aiogram.filters import Command
from aiogram.types import Message, CallbackQuery, TelegramObject
from aiogram.utils.keyboard import InlineKeyboardBuilder


load_dotenv(join(dirname(__file__), "../", "../", ".env"))
LIST_OF_ADMINS = os.getenv("LIST_OF_ADMINS").split(",")

# THiS MIDDLEWARE LET REQUESTS THROUGH ONLY iF ADMIN
class AdminMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
        event: Message,
        data: Dict[str, Any],
    ) -> Any:
        print(event.from_user.id)
        if str(event.from_user.id) in LIST_OF_ADMINS:
            return await handler(event, data)