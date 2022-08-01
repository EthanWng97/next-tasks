const got = require('@/utils/got');

function replaceAll(string, FindText, RepText) {
    const regExp = new RegExp(FindText, 'g');
    return string.replace(regExp, RepText);
}

module.exports = async (ctx) => {
    const lang = ctx.params.lang || 'en';
    const url = 'https://leetcode-cn.com/graphql';
    let responseBasic;
    const recordPayload =
        '{"query":"    query questionOfToday {  todayRecord {    date    userStatus    question {      questionId      frontendQuestionId: questionFrontendId      difficulty      title      titleCn: translatedTitle      titleSlug      paidOnly: isPaidOnly      freqBar      isFavor      acRate      status      solutionNum      hasVideoSolution      topicTags {        name        nameTranslated: translatedName        id      }      extra {        topCompanyTags {          imgUrl          slug          numSubscribed        }      }    }    lastSubmission {      id    }  }}    ","variables":{}}';
    responseBasic = await got({
        method: 'post',
        url: url,
        headers: {
            'content-type': 'application/json',
        },
        body: recordPayload,
    });

    let data = responseBasic.data.data.todayRecord[0];
    let date = data.date;
    let questionTitleSlug = data.question.titleSlug;
    date = '<b>Leetcode-cn.com ' + date + '</b>';

    const detailPayload =
        '{"operationName": "questionData", "variables":{"titleSlug": "' +
        questionTitleSlug +
        '"}, "query": "query questionData($titleSlug: String!) {  question(titleSlug: $titleSlug) {    questionId    questionFrontendId    categoryTitle    boundTopicId    title    titleSlug    content    translatedTitle    translatedContent    isPaidOnly    difficulty    likes    dislikes    isLiked    similarQuestions    contributors {      username      profileUrl      avatarUrl      __typename    }    langToValidPlayground    topicTags {      name      slug      translatedName      __typename    }    companyTagStats    codeSnippets {      lang      langSlug      code      __typename    }    stats    hints    solution {      id      canSeeDetail      __typename    }    status    sampleTestCase    metaData    judgerAvailable    judgeType    mysqlSchemas    enableRunCode    envInfo    book {      id      bookName      pressName      source      shortDescription      fullDescription      bookImgUrl      pressImgUrl      productUrl      __typename    }    isSubscribed    isDailyQuestion    dailyRecordStatus    editorType    ugcQuestionId    style    exampleTestcases    __typename  }}"}';

    responseBasic = await got({
        method: 'post',
        url: url,
        headers: {
            'content-type': 'application/json',
        },
        body: detailPayload,
    });
    data = responseBasic.data.data.question;

    let link;
    let content;
    let rss_title;
    let rss_link;
    if (lang === 'cn') {
        link = 'https://leetcode-cn.com/problems/' + questionTitleSlug;
        content = data.translatedContent;
        questionTitleSlug = data.translatedTitle;
        rss_title = 'Leetcode-cn.com 每日一题';
        rss_link = 'https://leetcode-cn.com';
    } else {
        link = 'https://leetcode.com/problems/' + questionTitleSlug;
        content = data.content;
        questionTitleSlug = data.titleSlug;
        rss_title = 'Leetcode-cn.com Today Record';
        rss_link = 'https://leetcode.com';
    }

    const questionFrontendId = data.questionFrontendId;
    const title = questionFrontendId + '.' + questionTitleSlug;

    let difficulty = data.difficulty;
    if (difficulty === 'Easy') {
        difficulty = '🟢';
    } else if (difficulty === 'Medium') {
        difficulty = '🟡';
    } else {
        difficulty = '🔴';
    }

    const topicTags = data.topicTags;
    let tags = '';
    for (const val in topicTags) {
        tags += '#' + topicTags[val].slug + ' ';
    }
    tags = replaceAll(tags, '-', '_');
    tags = '<strong>🏷️ Tags<br></strong>' + tags;

    data = {
        title: title,
        description: difficulty + ' ' + date + '<br><br>' + tags + '<br><br>' + content,
        pubDate: new Date().toUTCString(),
        link: link,
    };
    ctx.state.data = {
        title: rss_title,
        link: rss_link,
        description: rss_title,
        item: [
            {
                title: data.title,
                description: data.description,
                pubDate: data.pubDate,
                link: data.link,
            },
        ],
    };
};
