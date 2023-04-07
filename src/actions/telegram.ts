import TelegramBot from "node-telegram-bot-api";
import envs from "@/envs";

export const sendDocument = async (
  chatId: string,
  document: Buffer,
  options: any,
  fileOptions: any
) => {
  const bot = new TelegramBot(envs.value.telegram.bot_token ?? "", {
    polling: false,
  });

  await bot.sendDocument(chatId, document, options, fileOptions);
};
export const sendMessage = async (
  chatId: string,
  text: string,
  options: any
) => {
  const bot = new TelegramBot(envs.value.telegram.bot_token ?? "", {
    polling: false,
  });

  await bot.sendMessage(chatId, text, options);
};
