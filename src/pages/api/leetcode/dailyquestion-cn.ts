import type { NextApiRequest, NextApiResponse } from "next";
import { getDailyQuestionCN, getQuestionDetails } from "@/actions/leetcode";
import { sendMessage } from "@/actions/telegram";
import constants from "@/constants";
import { htmlToNode, createPage } from "@/actions/telegraph";
import envs from "@/envs";
import redis from "@/actions/redis";

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
  let response = await getDailyQuestionCN();
  if (response.status != 200) {
    res
      .status(response.status)
      .json({ code: response.status, message: response.statusText });
  }
  let data = await response.json();

  data = data.data.todayRecord[0];

  question.date = data.date;
  question.titleSlug = data.question.titleSlug;
  question.sourceLink =
    constants.value.leetcode.host_cn + "/problems/" + question.titleSlug;
  question.solutionLink = question.sourceLink + "solution";

  // check if the question is already updated
  const lastUpdateItem = await redis.get("leetcode/dailyquestion-cn");
  if (question.titleSlug == lastUpdateItem) {
    return res.status(200).json({
      code: 200,
      message: `Already updated. lastUpdateItem: ${lastUpdateItem}`,
    });
  }

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
  question.content = details.translatedContent;
  question.frontedId = details.questionFrontendId;
  question.difficulty = emoji[details.difficulty];

  let topicTags = details.topicTags;
  topicTags = topicTags.map((item: any) => {
    let slug = "#" + item.slug;
    slug = slug.replaceAll("-", "_");
    return slug;
  });
  question.tags = topicTags.join(" ");

  // creat telegraph page
  let telegraphPage = "";
  const node = htmlToNode(question.content);
  const page = await createPage(node, question.titleSlug);
  if (page !== null) {
    telegraphPage = page.data.result.url;
  }
  question.difficulty = `<a href="${telegraphPage}">${question.difficulty}</a>`;

  const caption =
    "<b>leetcode.cn " +
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

  const sendOptions = {
    caption: caption,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "来源",
            url: question.sourceLink,
          },
          {
            text: "答案",
            url: question.solutionLink,
          },
        ],
      ],
    },
  };

  await sendMessage(envs.value.leetcode.telegram_chat_id, caption, sendOptions);
  redis.set("leetcode/dailyquestion-cn", question.titleSlug);

  res.status(200).json(question);
}
