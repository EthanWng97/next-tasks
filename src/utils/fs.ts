import fs from "fs";
import path from "path";

const FETCHED_RSS_FILE = "fetched-rss.txt";
const filePath = path.join(process.cwd(), "", FETCHED_RSS_FILE);

export const getFetchedRSS = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const items = data.trim().split("\n");
    return items;
  } catch (err) {
    return null;
  }
};

export const storeFetchedRSS = (items: any) => {
  const oldItems = getFetchedRSS();
  const fetchedRss = Array.from(new Set(oldItems?.concat(items)));
  fs.writeFileSync(filePath, fetchedRss.join("\n"));
};
