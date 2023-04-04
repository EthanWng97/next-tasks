import Parser from "rss-parser";

export const RssParser = new Parser({
    customFields: {
        item: ["magnet"],
    },
});
