# checkin.js

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/ss-checkin.jpg" height="40%" width="40%">

1. 特点
   1. 展示已用流量，剩余流量和到期时间
   2. 云端运行脚本`Google Script`, 无需消耗本地资源和流量
2. 步骤
   1. 从 [BotFather](https://telegram.me/BotFather) 创建一个 bot，记下 `token`，代替脚本中的关键词 `BOT_TOKEN`
   2. 从 [get_id_bot](https://telegram.me/get_id_bot) 得到用户 `id`，代替脚本中的关键词 `CHAT_ID`
   3. 在脚本的 `accounts` 中进行账号的添加，内容顺序依次为 `站点名称`、`站点登录网址`、`邮箱`、`密码`，内容均需要用双引号 " " 或单引号 '' 括起来
   4. 拷贝脚本内容到 [Google Script](https://script.google.com/home/my) 的编辑器中
   5. 设置一个合适的时间去触发脚本
      > Edit -> Current project's triggers -> Add Trigger -> Choose which function to run(launch)
3. 注意 ⚠️
   1. 关于签到 Surge 和 Shortcuts 的[详细教程](https://www.notion.so/Check-in-0797ec9f9f3f445aae241d7762cf9d8b)
   2. 如果内容出错，检查返回数据的内容 `Logger.log()` 以及格式并修改正则表达式
   3. 如需进行测试，可以在编辑器中 `Run -> Debug function -> launch` 进行调试
   4. 如果有问题，欢迎 [反馈](https://t.me/Leped_Bot)
