import cron from "node-cron";
import { handler as fetchLeetcodeDailyQuestionCn } from "./leetcode/dailyquestion-cn"; // 确保路径正确
import { handler as fetchLeetcodeDailyQuestionEn } from "./leetcode/dailyquestion-en"; // 确保路径正确

cron.schedule("0 9 * * *", async () => {
    console.log("⏳ Running daily question CN task...");
    await fetchLeetcodeDailyQuestionCn().catch(console.error);
}, {
    timezone: "Asia/Shanghai",
});

cron.schedule("0 9 * * *", async () => {
    console.log("⏳ Running daily question EN task...");
    await fetchLeetcodeDailyQuestionEn().catch(console.error);
}, {
    timezone: "America/Los_Angeles",
});