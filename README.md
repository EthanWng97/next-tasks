# Profiles
📖 [文档](https://ttrss.henry.wang/zh/) | 📖 [Docs](https://ttrss.henry.wang)

## Filter - Surge and QuantumultX 规则集

## Scripts

### filter_conversion.js
**powered by CLOUDFLARE Workers**

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/process.jpeg" height="60%" width="60%">

1. 特点
    1. 从 QuantumultX 分流链接生成 Surge 规则集，反之亦然。
    2. 如果源链接改变，生成的分流链接自动改变。
2. Instructions
    1. 在 CloudFlare 网站中创建新的 Workers
    2. 粘贴所有脚本内容到编辑器中
    3. 填充并修改必要的内容 (url 和 正则)
    4. 保存和部署
   
### checkin.js
**By [Neurogram](https://github.com/Neurogram-R) feat [NavePnow](https://github.com/NavePnow)**

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/IMAGE 2019-11-12 19:57:53.jpg" height="40%" width="40%">

1. 特点
   1. 展示已用流量，剩余流量和到期时间
   2. 利用 Cron 定时运行脚本
2. 步骤
   1. `https://www.notion.so/Check-in-0797ec9f9f3f445aae241d7762cf9d8b`
   2. 如果内容出错，检查返回数据的内容以及格式并修改正则表达式

### checkin_1point.js
**By [NavePnow](https://github.com/NavePnow) feat [wangfei021325](https://t.me/wangfei021325)**

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/IMAGE 2019-11-12 19:58:49.jpg" height="40%" width="40%">
一亩三分地论坛自动签到脚本

[教程](https://nave.work/2019/11/07/%E4%B8%80%E4%BA%A9%E4%B8%89%E5%88%86%E5%9C%B0%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%88%B0%E8%84%9A%E6%9C%AC/#check-in-for-surge)

### 10010+.js
**By [NavePnow](https://github.com/NavePnow)**
根据作者[coo11](https://t.me/coo11) 的 Jsbox 脚本进行修改

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/IMG_0666.PNG" height="40%" width="40%">

1. 特点
   1. 显示剩余流量，话费余额和流量剩余
   2. 利用 Cron 定时运行脚本
2. 步骤
   1. 在支付宝小程序“中国联通”设置你的联通手机号 (提供 api)
   2. 在 Surge 目录下创建 10010+.js 并复制 [链接](https://raw.githubusercontent.com/NavePnow/Profiles/master/Scripts/10010%2B.js) 所有内容到脚本中
   3. 在指定地方添加联通手机号
   4. 在编辑模式下打开 Surge, 并在配置文件最后(Scripts内容下)添加`cron "00 12 * * *" debug=1,script-path=10010+.js` 
   5. 保存
    
3. 注意⚠️
    1. 如果你想把文件放在云端，确保该文件是私密的，因为支付宝api返回的数据包含了你的真实姓名。
    2. 如果有问题，欢迎 [联系](https://t.me/Leped_Bot) 


# Tip Jar

| PayPal                                                                                                                                                                       | 微信赞赏 WeChat Pay                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=DSZJCN4ZUEW74&currency_code=USD&source=url) | <img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/1234.JPG" width="200">
