import { RssParser } from "@/utils/rss-parser";
import { findAllDocuments, updateADocument } from "@/actions/mongodb";

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
  let fetchedRSS = await findAllDocuments("rss_items");
  fetchedRSS = fetchedRSS[0]?.guids || [];
  return fetchedRSS;
};

export const updateFetchedRss = async (unReadItems: any) => {
  const fetchedRSS = await getFetchRss();
  const unReadItemsGuid = unReadItems.map((item: any) => item.guid) || [];
  const allItemsGuid = Array.from(new Set([...fetchedRSS, ...unReadItemsGuid]));
  const newRSS = {
    guids: allItemsGuid,
  };
  const filter = {
    guids: fetchedRSS,
  };
  await updateADocument("rss_items", filter, newRSS);
};
