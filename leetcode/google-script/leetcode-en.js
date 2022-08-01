var token = "";
var chat_id = "@leetcodeDailyQuestion";

var telegramHost = "https://api.telegram.org/bot" + token;

var leetcodeHost = "https://leetcode.com";

var question = {
  date: "",
  sourceLink: "",
  solutionLink: "",
  titleSlug: "",
  content: "",
  frontedId: "",
  difficulty: "",
  tags: "",
  file: "",
};

function getAllImageTags(str) {
  let words = [];
  str.replace(/<img[^>]+src="([^">]+)"/g, function ($0, $1) {
    words.push($1);
  });
  return words;
}
function getDailyQuestion() {
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

  var options = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    payload: JSON.stringify(dailyQuestionPayload),
  };

  var dailyQuestionResponse = UrlFetchApp.fetch(
    leetcodeHost + "/graphql",
    options
  );
  const data = JSON.parse(dailyQuestionResponse).data
    .activeDailyCodingChallengeQuestion;
  question.date = data.date;
  question.sourceLink = leetcodeHost + data.link;
  question.solutionLink = question.sourceLink + "solution";
  question.titleSlug = data.question.titleSlug;
  getDetails();
}

function getDetails(questionTitleSlug, date) {
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
      titleSlug: question.titleSlug,
    },
  };

  var options = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    payload: JSON.stringify(detailsPayload),
  };

  var detailsResponse = UrlFetchApp.fetch(leetcodeHost + "/graphql", options);
  const emoji = {
    Medium: "🟡",
    Easy: "🟢",
    Hard: "🔴",
  };
  const details = JSON.parse(detailsResponse).data.question;
  question.content = details.content;
  question.frontedId = details.questionFrontendId;
  question.difficulty = emoji[details.difficulty];

  // handle images

  const images = getAllImageTags(question.content);
  images.forEach((image) => {
    const res = UrlFetchApp.fetch(image);
    const imgbase64 =
      "data:" +
      res.getBlob().getContentType() +
      ";base64," +
      Utilities.base64Encode(res.getBlob().getBytes());
    // question.content = replaceAll(question.content, image, imgbase64);
    question.content = question.content.replace(image, imgbase64);
  });

  const blob = Utilities.newBlob(question.content, MimeType.HTML);
  blob.setName(question.frontedId + "." + question.titleSlug + ".pdf");
  question.file = blob.getAs(MimeType.PDF);

  let topicTags = details.topicTags;
  topicTags = topicTags.map((item) => {
    let slug = "#" + item.slug;
    slug = slug.replaceAll("-", "_");
    return slug;
  });
  question.tags = topicTags.join(" ");
  originalData();
}

function originalData() {
  const caption =
    "<b>Leetcode.com " +
    question.date +
    "</b>\n" +
    "<b>" +
    question.difficulty +
    question.frontedId +
    "." +
    question.titleSlug +
    "</b>\n\n" +
    "<strong>🏷️ Tags\n</strong>" +
    question.tags;
  var payload = {
    method: "sendDocument",
    chat_id: chat_id,
    document: question.file,
    caption: caption,
    parse_mode: "Html",
    reply_markup:
      '{"inline_keyboard" : [' +
      "[" +
      '{"text":"Source", "url" : "' +
      question.sourceLink +
      '"},' +
      '{"text":"Solution", "url" : "' +
      question.solutionLink +
      '"}' +
      "]" +
      "]}",
  };
  sendMsg(payload);
}

function sendMsg(payload) {
  var options = {
    method: "post",
    payload: payload,
  };

  UrlFetchApp.fetch(telegramHost + "/", options);
}
