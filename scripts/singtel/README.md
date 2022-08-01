# singtel

## jsbox

**UI inspired by [lchreal6](https://github.com/lchreal6)**

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/singtel+.jpg" height="30%" width="30%">

1. 特点
   1. 显示剩余话费，流量，短信和电话相关信息
2. 步骤
   1. 利用`Erots`商店进行脚本的下载 [脚本链接](https://liuguogy.github.io/JSBox-addins/?q=show&objectId=5e67326840595e0008b5481f)
   2. 安装抓包软件，例如 [HTTP Catcher](https://apps.apple.com/us/app/http-catcher/id1445874902)
   3. 安装 [hi!App](https://apps.apple.com/us/app/singtel-prepaid-hi-app/id1034712778) 软件，并利用自己的手机号进行登录
   4. 打开抓包软件进行抓包，刷新 `hi!App` (重新打开)
   5. 在网络请求中找到 `https://hiapp.aws.singtel.com/api/v2/usage,fm/dashboard`
   6. 记下请求头中的 `Authorization` 和 `Cookie`，代替脚本中的关键词
   7. 在小组件中进行设置，调整高度 (推荐: 180)

## google scripts

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/IMG_1888.jpg" height="40%" width="40%">

1. 特点
   1. 显示剩余话费，流量，短信和电话相关信息
   2. 云端运行脚本`Google Script`, 无需消耗本地资源和流量
2. 步骤
   1. 从 [BotFather](https://telegram.me/BotFather) 创建一个 bot，记下 `token`，代替脚本中的关键词 `BOT_TOKEN`
   2. 从 [get_id_bot](https://telegram.me/get_id_bot) 得到用户 `id`，代替脚本中的关键词 `CHAT_ID`
   3. 安装抓包软件，例如 [HTTP Catcher](https://apps.apple.com/us/app/http-catcher/id1445874902)
   4. 安装 [hi!App](https://apps.apple.com/us/app/singtel-prepaid-hi-app/id1034712778) 软件，并利用自己的手机号进行登录
   5. 打开抓包软件进行抓包，刷新 `hi!App` (重新打开)
   6. 在网络请求中找到 `https://hiapp.aws.singtel.com/api/v2/usage/dashboard`
   7. 记下请求头中的 `Authorization` 和 `Cookie`，代替脚本中的关键词
   8. 拷贝脚本内容到 [Google Script](https://script.google.com/home/my) 的编辑器中
   9. 设置一个合适的时间去触发脚本
      > Edit -> Current project's triggers -> Add Trigger
