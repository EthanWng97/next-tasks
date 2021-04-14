var bot_token = '';
var chat_id = "@leetcodeTodayRecord";

var tg_url = "https://api.telegram.org/bot" + bot_token;

var cn_url = 'https://leetcode-cn.com/graphql';
var en_url = 'https://leetcode.com/graphql';


var headers = {
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN",
    "content-type": "application/json",
    "cookie": "",
    "origin": "https://leetcode-cn.com",
    "referer": "https://leetcode-cn.com/problemset/all/",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4471.0 Safari/537.36",
    "x-csrftoken": "",
    "x-definition-name": "",
    "x-operation-name": "",
    "x-timezone": "Asia/Shanghai"
};


function getLeetcode() {
    var payload = "{\"operationName\": \"questionOfToday\", \"variables\":{}, \"query\":\"query questionOfToday {  todayRecord {    question {      questionFrontendId          questionTitleSlug      __typename    }    lastSubmission {      id       __typename   }    date    userStatus    __typename  }}\"}";

    var options = {
        'method': 'post',
        'headers': headers,
        'payload': payload
    };

    var response = UrlFetchApp.fetch(cn_url, options);
    if (!response) {
        var error_text = "*Leetcode " + "登录失败*" + "\n 请重新获取 Cookie";
        originalData(error_text);
    } else {
        var data = JSON.parse(response).data.todayRecord[0];
        var date = data.date;
        var questionFrontendId = data.question.questionFrontendId;
        var questionTitleSlug = data.question.questionTitleSlug;
        date = '<b>Leetcode ' + date + "</b>";
        var title = questionFrontendId + "." + questionTitleSlug;
        var cn_link = "https://leetcode-cn.com/problems/" + questionTitleSlug;
        var en_link = "https://leetcode.com/problems/" + questionTitleSlug;
        getDetails(questionTitleSlug, date, title, cn_link, en_link);
    }

}

function getDetails(questionTitleSlug, date, title, cn_link, en_link) {
    Logger.log(questionTitleSlug);
    var payload = "{\"operationName\": \"questionData\", \"variables\":{\"titleSlug\": \"" + questionTitleSlug + "\"}, \"query\": \"query questionData($titleSlug: String!) {  question(titleSlug: $titleSlug) {    questionId    questionFrontendId    boundTopicId    title    titleSlug    content    translatedTitle    translatedContent    isPaidOnly    difficulty    likes    dislikes    isLiked    similarQuestions    exampleTestcases    contributors {      username      profileUrl      avatarUrl      __typename    }    topicTags {      name      slug      translatedName      __typename    }    companyTagStats    codeSnippets {      lang      langSlug      code      __typename    }    stats    hints    solution {      id      canSeeDetail      paidOnly      hasVideoSolution      paidOnlyVideo      __typename    }    status    sampleTestCase    metaData    judgerAvailable    judgeType    mysqlSchemas    enableRunCode    enableTestMode    enableDebugger    envInfo    libraryUrl    adminUrl    __typename  }}\"}";
    var options = {
        'method': 'post',
        'headers': headers,
        'payload': payload
    };

    var response = UrlFetchApp.fetch(en_url, options);
    if (!response) {
        var error_text = "*Leetcode " + "登录失败*" + "\n 请重新获取 Cookie";
        originalData(error_text);
    } else {
        var content = JSON.parse(response).data.question.content;
        var difficulty = JSON.parse(response).data.question.difficulty;
        if (difficulty == 'Easy') difficulty = '🟢';
        else if (difficulty == 'Medium') difficulty = '🟡';
        else difficulty = '🔴';

        var description_pattern = /(?=<p>)(.*)?(?=<\/p>)/g;
        var description;
        if (content.match(description_pattern)) {
            description = content.match(description_pattern)[0];
            description = description.replace("<p>", "");
            description = description.replace("</p>", "");
        }

        var example_pattern = /<pre>[\s\S]*?<\/pre>/g;
        var example;
        if (content.match(example_pattern)) {
            example = content.match(example_pattern)[0];
            example = example.replace("</p>", "");
        }

        var pattern_image = /src="[\s\S]*?(?=" style)/g;
        var image;
        if (content.match(pattern_image)) {
            image = content.match(pattern_image)[0];
            image = image.replace("src=\"", "");
        }

        image = "<a href=\"" + image + "\"> " + difficulty + "</a>";

        var topicTags = JSON.parse(response).data.question.topicTags;
        Logger.log(topicTags);
        var tags = "";
        for (var val in topicTags) {
            tags += "#" + topicTags[val].slug + " ";
        }
        originalData(date + '\n' + image + ' <b>' + title + '</b>\n' + tags + '\n\n' + description + '\n' + example, cn_link, en_link);
    }
}

function originalData(estring, cn_link, en_link) {
    var payload = {
        "method": "sendMessage",
        "chat_id": chat_id,
        "text": estring,
        "parse_mode": "Html",
        "reply_markup": "{\"inline_keyboard\" : [" +
            "[" +
            "{\"text\":\"CN\", \"url\" : \"" + cn_link + "\"}," +
            "{\"text\":\"EN\", \"url\" : \"" + en_link + "\"}" +
            "]" +
            "]}"


    };
    sendMsg(payload)
}

function sendMsg(payload) {
    var options = {
        'method': 'post',
        'payload': payload
    };

    UrlFetchApp.fetch(tg_url + "/", options)
}