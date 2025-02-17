from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

def menu_ikb() -> InlineKeyboardMarkup:
    ikb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='📂 Projects', callback_data='menu_projects')
            ],
        ]
    )
    return ikb


def projects_action_ikb() -> InlineKeyboardMarkup:
    ikb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='➕', callback_data='projects_add'),
                InlineKeyboardButton(text='🗑', callback_data='projects_delete'),
                InlineKeyboardButton(text='✏️', callback_data='projects_edit'),
            ],
            [
                InlineKeyboardButton(text='📗Rules', callback_data='projects_rules'),
                InlineKeyboardButton(text='◀️', callback_data='menu'),
            ],
        ]
    )
    return ikb

def projects_type_ikb() -> InlineKeyboardMarkup:
    ikb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='Web-Development', callback_data='projects_add_type_web_dev'),
            ],
            [
                InlineKeyboardButton(text='Web-Design', callback_data='projects_add_type_web_design'),
            ],
            [
                InlineKeyboardButton(text='Graphic-Design', callback_data='projects_add_type_graph_design'),
            ],
            [
                InlineKeyboardButton(text='Side Projects', callback_data='projects_add_type_side_projects'),
                InlineKeyboardButton(text='◀️', callback_data='menu_projects'),
            ]
        ]
    )
    return ikb

def projects_add_back_ikb(current_state) -> InlineKeyboardMarkup:
    ikb = InlineKeyboardMarkup(
        inline_keyboard=[
            # [
            #     InlineKeyboardButton(text='🔁', callback_data=f'projects_add_again_{current_state}'),
            # ],
            [
                InlineKeyboardButton(text='◀️', callback_data=f'projects_add_back_from_{current_state}'),
            ],
        ]
    )
    return ikb


def projects_add_accept_ikb() -> InlineKeyboardMarkup:
    ikb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='✅', callback_data=f'projects_add_accept'),
            ],
        ]
    )
    return ikb

def projects_add_translation_start_ikb() -> InlineKeyboardMarkup:
    ikb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='🗑', callback_data=f'menu_projects'),
                InlineKeyboardButton(text='➕', callback_data=f'projects_add_add_more'),
                InlineKeyboardButton(text='✅', callback_data=f'projects_add_translation_start'),
            ],
        ]
    )
    return ikb

def projects_add_translation_accept_ikb() -> InlineKeyboardMarkup:
    ikb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text='🗑', callback_data=f'menu_projects'),
                InlineKeyboardButton(text='✅', callback_data=f'projects_add_translation_accept'),
            ],
        ]
    )
    return ikb

# def get_channels_ikb(language) -> InlineKeyboardMarkup:
#     builder = InlineKeyboardBuilder()
#     channel_list = channels_list.channel_list_ru if language == 'ru' else channels_list.channel_list_en
#     for channel in channel_list:
#         builder.button(text = _('Follow', language), url = channel)
#     builder.button(text= _('I have followed', language), callback_data='check_follow')
#     builder.adjust(1)
#     return builder.as_markup()