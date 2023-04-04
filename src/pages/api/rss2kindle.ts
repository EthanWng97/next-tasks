import type { NextApiRequest, NextApiResponse } from "next";
import { RssParser } from "@/utils/rss-parser";
import { getFetchedRSS, storeFetchedRSS } from "@/utils/fs";
import { convertFile } from "@/utils/cloudconvert";
import { sendEmail } from "@/utils/send-email";
import axios from "axios";

type Data = {
  name: string;
};

const RssUrl =
  "https://www.inoreader.com/stream/user/1005137674/tag/user-favorites";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const feed = await RssParser.parseURL(RssUrl);

  const fetchedRSS = getFetchedRSS();
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

  storeFetchedRSS(unReadItems.map((item) => item.guid));

  res.status(200).json({ name: "John Doe" });
}
