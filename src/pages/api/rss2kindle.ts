import type { NextApiRequest, NextApiResponse } from "next";
import { RssParser } from "@/utils/rss-parser";
import { findAllDocuments, updateADocument } from "@/utils/mongodb";
import { convertFile } from "@/utils/cloudconvert";
import { sendEmail } from "@/utils/send-email";
import axios from "axios";

const RssUrl =
  "https://www.inoreader.com/stream/user/1005137674/tag/user-favorites";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const feed = await RssParser.parseURL(RssUrl);

  let fetchedRSS = await findAllDocuments("rss_items");
  fetchedRSS = fetchedRSS[0]?.guids || [];
  const unReadItems = feed.items.filter((item: any) => {
    if (item?.categories?.includes("Podcast")) return false;
    return !fetchedRSS?.includes(item.guid);
  });
  unReadItems.map(async (item) => {
    const inputFileName = item.title + ".html";
    const inputFileContent = item.content || "";
    const outputFileName = item.title + ".epub";
    const file = await convertFile(
      inputFileName,
      inputFileContent,
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
  const unReadItemsGuid = unReadItems.map((item) => item.guid) || [];
  const allItemsGuid = Array.from(new Set([...fetchedRSS, ...unReadItemsGuid]));
  console.log(allItemsGuid);
  const newRSS = {
    guids: allItemsGuid,
  };
  const filter = {
    guids: fetchedRSS,
  };
  updateADocument("rss_items", filter, newRSS);

  res.status(200).json({ name: "John Doe" });
}
