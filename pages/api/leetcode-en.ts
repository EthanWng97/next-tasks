import type { NextApiRequest, NextApiResponse } from "next";
import { getEnDailyQuestion, getQuestionDetails } from "@utils/leetcode";
import { sendDocument } from "@utils/telegram";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    var question = {
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

    const file = new Blob([question.content], { type: "text/html" });

    let topicTags = details.topicTags;
    topicTags = topicTags.map((item: any) => {
        let slug = "#" + item.slug;
        slug = slug.replaceAll("-", "_");
        return slug;
    });
    question.tags = topicTags.join(" ");
    sendDocument(question, file);

    res.status(200).json({ name: "John Doe" });
}
