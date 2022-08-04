import TelegramBot from "node-telegram-bot-api";

export const sendDocument = async (
  chatId: string,
  document: Buffer,
  options: any,
  fileOptions: any
) => {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN ?? "", {
    polling: false,
  });

  await bot.sendDocument(chatId, document, options, fileOptions);
};
