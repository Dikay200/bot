from zlapi import ZaloBot, TextMessage

# Khai báo đối tượng bot
bot = ZaloBot()

# Định nghĩa hàm xử lý tin nhắn
@bot.middleware
async def handle_message(request, next_middleware):
    message = request['message']
    if isinstance(message, TextMessage) and message.text == '/test':
        await bot.send_text_message(request['sender']['id'], 'ngon')
    await next_middleware(request)

# Khởi động bot
bot.run()
