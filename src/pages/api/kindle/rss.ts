import type { NextApiRequest, NextApiResponse } from "next";
import { convertFile } from "@/actions/cloudconvert";
import { sendEmail } from "@/actions/send-email";
import { updateFetchedRss, checkForRssUpdates } from "@/actions/rss";
import axios from "axios";

const RssUrl =
  "https://www.inoreader.com/stream/user/1005137674/tag/user-favorites";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const unReadItems = await checkForRssUpdates(RssUrl);
  if (unReadItems.length === 0) {
    // TODO: customize return meesage
    return res.status(200).json({ name: "John Doe" });
  }
  unReadItems.map(async (item) => {
    const inputFileName = item.title + ".html";
    const inputFileContent = item.content || "";
    const outputFileName = item.title + ".epub";
    const file = await convertFile(
      inputFileName,
      inputFileContent,
      "epub",
      outputFileName
    );
    if (file === null) {
      res.status(400).json({ error: "Error converting file" });
      return;
    }
    const response = await axios.get(file.url || "", {
      responseType: "arraybuffer",
    });
    const fileData = response.data;
    sendEmail(
      "navepnow@gmail.com",
      "yifwang@kindle.com",
      "test",
      "test",
      file.filename,
      fileData
    );
  });
  await updateFetchedRss(unReadItems);

  res.status(200).json({ name: "John Doe" });
}
