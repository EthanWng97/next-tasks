import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/send-email";
import { updateFetchedRss, checkForRssUpdates } from "@/lib/rss";
import { htmlToEpub } from "@/lib/converter";
import fs from "fs";

const RssUrl =
  "https://www.inoreader.com/stream/user/1005137674/tag/user-favorites";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const unReadItems = await checkForRssUpdates(RssUrl);
  if (unReadItems.length === 0) {
    return res.status(200).json({
      code: 200,
      message: `No unReadItems`,
    });
  }
  for (const item of unReadItems) {
    const inputFileContent = item.content || "";
    const outputFileName = item.title + ".epub";
    await htmlToEpub(item.title || "", inputFileContent);
    const fileData = fs.createReadStream("/tmp/output.epub");
    sendEmail(
      "navepnow@gmail.com",
      "yifwang@kindle.com",
      "test",
      "test",
      outputFileName,
      fileData
    );
  }
  await updateFetchedRss(unReadItems);

  res.status(200).json({ name: "John Doe" });
}
