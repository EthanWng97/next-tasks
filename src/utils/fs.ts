import fs from "fs";

const FETCHED_RSS_FILE = "fetched-rss.txt";

export const getFetchedRSS = () => {
  try {
    const data = fs.readFileSync(FETCHED_RSS_FILE, "utf8");
    const items = data.trim().split("\n");
    return items;
  } catch (err) {
    return null;
  }
};

export const storeFetchedRSS = (items: any) => {
  const oldItems = getFetchedRSS();
  const fetchedRss = Array.from(new Set(oldItems?.concat(items)));
  fs.writeFileSync(FETCHED_RSS_FILE, fetchedRss.join("\n"));
};
