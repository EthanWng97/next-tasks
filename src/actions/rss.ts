import { RssParser } from "@/utils/rss-parser";
import redis from "@/actions/redis";

export const checkForRssUpdates = async (RssUrl: string) => {
  const feed = await RssParser.parseURL(RssUrl);
  const fetchedRSS = await getFetchRss();
  const unReadItems = feed.items.filter((item: any) => {
    if (item?.categories?.includes("Podcast")) return false;
    return !fetchedRSS?.includes(item.guid);
  });
  return unReadItems;
};

export const getFetchRss = async () => {
  let response = await redis.get("kindle/rss");
  const fetchedRSS = response ? JSON.parse(response) : [];
  return fetchedRSS;
};

export const updateFetchedRss = async (unReadItems: any) => {
  const fetchedRSS = await getFetchRss();
  const unReadItemsGuid = unReadItems.map((item: any) => item.guid) || [];
  const allItemsGuid = Array.from(new Set([...fetchedRSS, ...unReadItemsGuid]));
  redis.set("kindle/rss", JSON.stringify(allItemsGuid));
};
