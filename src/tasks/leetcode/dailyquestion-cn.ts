import { getDailyQuestionCN, getQuestionDetails } from "../../lib/leetcode";
import { sendMessage } from "../../lib/telegram";
import constants from "../../constants";
import { htmlToNode, createPage } from "../..//lib/telegraph";
import envs from "../../envs";
import redis from "../../lib/redis";

export async function handler() {
    console.log("🚀 Starting LeetCode daily question task...");

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

    try {

        // fetch daily question
        let response = await getDailyQuestionCN();
        if (response.status != 200) {
            console.error("❌ Failed to fetch daily question");
            return
        }
        let data = await response.json();

        data = data.data.todayRecord[0];

        question.date = data.date;
        question.titleSlug = data.question.titleSlug;
        question.sourceLink =
            constants.value.leetcode.host_cn + "/problems/" + question.titleSlug;
        question.solutionLink = question.sourceLink + "solution";

        console.log(`📌 Today's question: ${question.titleSlug}`);

        // check if the question is already updated
        const lastUpdateItem = await redis.get("leetcode/dailyquestion-cn");
        if (question.titleSlug == lastUpdateItem) {
            console.log("⏳ Already processed. Exiting...");
            return
        }

        response = await getQuestionDetails(question.titleSlug);
        if (response.status != 200) {
            console.error("❌ Failed to fetch question details");
            return
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
    } catch (error) {
        console.error("❌ Error in handler:", error);
    } finally {
        // 确保 Redis 连接关闭
        console.log("🛑 Closing Redis connection...");
        await redis.disconnect();
        console.log("👋 Task completed.");
    }
}

handler().catch(console.error);