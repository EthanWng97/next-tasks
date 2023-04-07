import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDailyQuestionEN,
  getQuestionDetails,
  updateLastUpdateItem,
} from "@/actions/leetcode";
import { sendDocument } from "@/actions/telegram";
import constants from "@/constants";

type ResponseError = {
  code: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseError | any>
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

  // fetch daily question
  let response = await getDailyQuestionEN();
  if (response.status != 200) {
    res
      .status(response.status)
      .json({ code: response.status, message: response.statusText });
  }
  let data = await response.json();

  data = data.data.activeDailyCodingChallengeQuestion;

  question.date = data.date;
  question.sourceLink = constants.value.leetcode.host_en + data.link;
  question.solutionLink = question.sourceLink + "solution";
  question.titleSlug = data.question.titleSlug;

  response = await getQuestionDetails(question.titleSlug);
  if (response.status != 200) {
    res
      .status(response.status)
      .json({ code: response.status, message: response.statusText });
  }

  const emoji: { [key: string]: string } = {
    Medium: "🟡",
    Easy: "🟢",
    Hard: "🔴",
  };
  let details = await response.json();

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
    "<b>leetcode.com " +
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
    filename: question.frontedId + "." + question.titleSlug + ".html",
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
  console.log(question.sourceLink);
  updateLastUpdateItem(question.sourceLink, "en");

  res.status(200).json(question);
}
