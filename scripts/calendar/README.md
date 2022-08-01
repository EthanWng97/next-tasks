# calendar

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/IMG_1925.jpg" height="35%" width="35%">

1. 特点
   1. 根据 `Google Calendar Api` 可同时设置多个日历进行每日提醒
   2. 云端运行脚本`Google Script`, 无需消耗本地资源和流量
2. 步骤
   1. 从 [BotFather](https://telegram.me/BotFather) 创建一个 bot，记下 `token`，代替脚本中的关键词
   2. 从 [get_id_bot](https://telegram.me/get_id_bot) 得到用户 `id`，代替脚本中的关键词
   3. 在 [Google Developers Console](https://console.developers.google.com) 中登录并激活你的 Google 账户
   4. 在 [Google Developers Console](https://console.developers.google.com) 激活 Google Calendar API
   5. 打开 [Google Developers Console](https://console.developers.google.com), 在凭证标签下创建新的 `Public API access key`， 代替脚本中的关键词 `API_KEY`
   6. 在 `[Google Calendar] -> [Setting and Sharing] -> [Calendar Setting]` 下找到你的 `Calendar ID` ,添加到脚本 `calendar_id` 中
   7. 拷贝脚本内容到 [Google Script](https://script.google.com/home/my) 的编辑器中
   8. 设置一个合适的时间去触发脚本
      > Edit -> Current project's triggers -> Add Trigger
