import constants from "@/constants";
import { findAllDocuments, updateADocument } from "@/actions/mongodb";
export const getDailyQuestionEN = async () => {
  const dailyQuestionPayload = {
    query: `query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                link
                question {
                    frontendQuestionId: questionFrontendId
                    titleSlug
                }
            }
        } `,
    variables: {},
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dailyQuestionPayload),
  };
  const response = await fetch(
    constants.value.leetcode.host_en + "/graphql",
    options
  );
  return response;
};

export const getDailyQuestionCN = async () => {
  const dailyQuestionPayload = {
    query: `query questionOfToday {
            todayRecord {
                date
                question {
                    frontendQuestionId: questionFrontendId
                    titleSlug
                }
            }
        } `,
    variables: {},
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dailyQuestionPayload),
  };
  const response = await fetch(
    constants.value.leetcode.host_cn + "/graphql",
    options
  );
  return response;
};

export const getQuestionDetails = async (questionTitleSlug: string) => {
  const detailsPayload = {
    operationName: "questionData",
    query: `query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                title
                titleSlug
                content
                translatedTitle
                translatedContent
                difficulty
                topicTags {
                    name
                    slug
                    translatedName
                    __typename
                }
                __typename
            }
        }`,
    variables: {
      titleSlug: questionTitleSlug,
    },
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(detailsPayload),
  };
  const response = await fetch(
    constants.value.leetcode.host_cn + "/graphql",
    options
  );
  return response;
};
export const getLastUpdateItem = async () => {
  let lastUpdateItem = await findAllDocuments("leetcode");
  console.log(lastUpdateItem);
  // fetchedRSS = fetchedRSS[0]?.guids || [];
  // return fetchedRSS;
};
export const updateLastUpdateItem = async (newLink: string, host: string) => {
  const lastUpdateItem = await getLastUpdateItem();
  const newItem = {
    cn: "",
    en: "",
  };
  const filter = {
    guids: "",
  };
  // const filter = lastUpdateItem;
  await updateADocument("leetcode", filter, newItem);
};
