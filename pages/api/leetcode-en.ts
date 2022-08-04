import type { NextApiRequest, NextApiResponse } from "next";
import { getEnDailyQuestion, getQuestionDetails } from "@utils/leetcode";
import { sendDocument } from "@utils/telegram";

// type Data = {
//   name: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const question = {
    date: "",
    sourceLink: "",
    solutionLink: "",
    titleSlug: "",
    content: "",
    frontedId: "",
    difficulty: "",
    tags: "",
  };
  let data = await getEnDailyQuestion();
  data = data.data.activeDailyCodingChallengeQuestion;

  question.date = data.date;
  question.sourceLink = process.env.LEETCODE_EN_HOST + data.link;
  question.solutionLink = question.sourceLink + "solution";
  question.titleSlug = data.question.titleSlug;

  let details = await getQuestionDetails(question.titleSlug);
  const emoji: { [key: string]: string } = {
    Medium: "🟡",
    Easy: "🟢",
    Hard: "🔴",
  };
  details = details.data.question;
  question.content = details.content;
  question.frontedId = details.questionFrontendId;
  question.difficulty = emoji[details.difficulty];

  let topicTags = details.topicTags;
  topicTags = topicTags.map((item: any) => {
    let slug = "#" + item.slug;
    slug = slug.replaceAll("-", "_");
    return slug;
  });
  question.tags = topicTags.join(" ");

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

  const buff = Buffer.from(question.content, "utf-8");

  const fileOptions = {
    // Explicitly specify the file name.
    filename: "test.html",
    // Explicitly specify the MIME type.
    contentType: "text/html",
  };

  const sendOptions = {
    caption: caption,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Source",
            url: question.sourceLink,
          },
          {
            text: "Solution",
            url: question.solutionLink,
          },
        ],
      ],
    },
  };

  await sendDocument(
    process.env.TELEGRAM_LEETCODE_CHAT_ID ?? "",
    buff,
    sendOptions,
    fileOptions
  );

  res.status(200).json(question);
}
