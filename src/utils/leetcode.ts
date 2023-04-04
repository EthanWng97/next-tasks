import { LEETCODE_HOST_CN, LEETCODE_HOST_EN } from "@/utils/constants";
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
  const response = await fetch(LEETCODE_HOST_EN + "/graphql", options);
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
  const response = await fetch(LEETCODE_HOST_CN + "/graphql", options);
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
  const response = await fetch(LEETCODE_HOST_CN + "/graphql", options);
  return response;
};
