export const sendDocument = async (question: any, file: any) => {
  const caption =
    "<b>Leetcode.com " +
    question.date +
    "</b>\n" +
    "<b>" +
    question.difficulty +
    question.frontedId +
    "." +
    question.titleSlug +
    "</b>\n\n" +
    "<strong>🏷️ Tags\n</strong>" +
    question.tags;

  const reply_markup =
    '{"inline_keyboard" : [' +
    "[" +
    '{"text":"Source", "url" : "' +
    question.sourceLink +
    '"},' +
    '{"text":"Solution", "url" : "' +
    question.solutionLink +
    '"}' +
    "]" +
    "]}";

  const formData = new FormData();
  formData.append("method", "sendDocument");
  formData.append("chat_id", process.env.TELEGRAM_LEETCODE_CHAT_ID ?? "");
  formData.append(
    "document",
    file,
    question.frontedId + "." + question.titleSlug + ".html"
  );
  formData.append("caption", caption);
  formData.append("parse_mode", "Html");
  formData.append("reply_markup", reply_markup);

  const options = {
    method: "POST",
    body: formData,
  };
  let url = process.env.TELEGRAM_HOST ?? "";
  url = url.concat(process.env.TELEGRAM_BOT_TOKEN ?? "");
  url = url.concat("/");

  await fetch(url, options);
};
