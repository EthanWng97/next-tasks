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
        var cn_solution_link = cn_link + "/solution";
        var en_solution_link = en_link + "/solution";
        getDetails(questionTitleSlug, date, title, cn_link, en_link, cn_solution_link, en_solution_link);
    }

}

String.prototype.replaceAll = function (FindText, RepText) {
    regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
}

function deleteDoubleBr(string) {
    regExp = new RegExp("\n\n", "g");
    if (string.match(regExp)) {
        return deleteDoubleBr(string.replace(regExp, "\n"));
    } else return string.replace(regExp, "\n");
}

function getDetails(questionTitleSlug, date, title, cn_link, en_link, cn_solution_link, en_solution_link) {
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
        var description_pattern = /<p>[\s\S]*?(?=Example)/g;
        var description;
        if (content.match(description_pattern)) {
            description = content.match(description_pattern)[0];
            description = description.replaceAll("<p>&nbsp;</p>\n<p><strong>", "");
            description = description.replaceAll("<p>&nbsp;</p>\n<p><b>", "");
            description = description.replaceAll("&nbsp;", " ");
            description = description.replaceAll("<p>", "");
            description = description.replaceAll("</p>", "");
            description = description.replaceAll("<ul>", "");
            description = description.replaceAll("</ul>", "");
            description = description.replaceAll("<li>", "");
            description = description.replaceAll("</li>", "");
            description = description.replaceAll("<ol>", "");
            description = description.replaceAll("</ol>", "");
            description = description.replaceAll("<sup>", "");
            description = description.replaceAll("</sup>", "");
            // description = deleteDoubleBr(description);
        }
        description = '<strong>2️⃣ Description \n</strong>' + description;

        var example_pattern_1 = /<strong>Input[\s\S]*?(?=<\/pre>)/g;
        var example_pattern_2 = /<b>Input[\s\S]*?(?=<\/pre>)/g;
        var example;
        if (content.match(example_pattern_1)) {
            example = content.match(example_pattern_1)[0];
            example = example.replaceAll("&nbsp;", " ");
            example = example.replaceAll("</p>", "");
        } else if (content.match(example_pattern_2)) {
            example = content.match(example_pattern_2)[0];
            example = example.replaceAll("&nbsp;", " ");
            example = example.replaceAll("</p>", "");
        }
        example = '<strong>3️⃣ Example</strong>\n<pre>' + example + '</pre>';

        var pattern_image = /src="[\s\S]*?(?=" style)/g;
        var image;
        if (content.match(pattern_image)) {
            image = content.match(pattern_image)[0];
            image = image.replace("src=\"", "");
        }

        image = "<a href=\"" + image + "\">" + difficulty + "</a>";

        var topicTags = JSON.parse(response).data.question.topicTags;
        var tags = "";
        for (var val in topicTags) {
            tags += "#" + topicTags[val].slug + " ";
        }
        tags = tags.replaceAll("-", "_");
        tags = '<strong>1️⃣ Tags\n</strong>' + tags;

        originalData(date + '\n' + image + ' <b>' + title + '</b>\n\n' + tags + '\n\n' + description + example, cn_link, en_link, cn_solution_link, en_solution_link);
    }
}

function originalData(estring, cn_link, en_link, cn_solution_link, en_solution_link) {
    var payload = {
        "method": "sendMessage",
        "chat_id": chat_id,
        "text": estring,
        "parse_mode": "Html",
        "reply_markup": "{\"inline_keyboard\" : [" +
            "[" +
            "{\"text\":\"CN\", \"url\" : \"" + cn_link + "\"}," +
            "{\"text\":\"CN Solution\", \"url\" : \"" + cn_solution_link + "\"}" +
            "]," +
            "[" +
            "{\"text\":\"EN\", \"url\" : \"" + en_link + "\"}," +
            "{\"text\":\"EN Solution\", \"url\" : \"" + en_solution_link + "\"}" +
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