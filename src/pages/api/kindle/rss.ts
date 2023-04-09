import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/send-email";
import { updateFetchedRss, checkForRssUpdates } from "@/lib/rss";
import { htmlToEpub } from "@/lib/converter";
import envs from "@/envs";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const unReadItems = await checkForRssUpdates(envs.value.rss.url);
  if (unReadItems.length === 0) {
    return res.status(200).json({
      message: `No unread items`,
    });
  }
  for (const item of unReadItems) {
    try {
      const inputFileContent = item.content || "";
      const outputFileName = item.title + ".epub";
      await htmlToEpub(item.title || "", inputFileContent);
      const fileData = fs.createReadStream("/tmp/output.epub");
      await sendEmail(
        "navepnow@gmail.com",
        "yifwang@kindle.com",
        "test",
        "test",
        outputFileName,
        fileData
      );
    } catch (err) {
      return res.status(500).json({
        message: `Error: ${err}`,
      });
    }
  }
  await updateFetchedRss(unReadItems);

  res.status(200).json({
    message: "send unread items successfully",
    data: unReadItems.map((item) => ({ title: item.title, link: item.link })),
  });
}
