# 10010+.js/10010+\_qx.js

**By [NavePnow](https://github.com/NavePnow)**
根据作者[coo11](https://t.me/coo11) 的 Jsbox 脚本进行修改

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/IMG_0666.PNG" height="40%" width="40%">

1. 特点
   1. 显示剩余流量，话费余额和流量剩余
   2. 利用 Cron 定时运行脚本
2. 步骤
   1. 在支付宝小程序“中国联通”设置你的联通手机号 (提供 api)
   2. 在 Surge/QuantumultX Scripts 目录下创建 10010+.js 并复制 [链接](https://raw.githubusercontent.com/NavePnow/Profiles/master/Scripts/10010%2B.js) 所有内容到脚本中 [QuantumultX](https://raw.githubusercontent.com/NavePnow/Profiles/master/Scripts/10010%2B_qx.js) 同理
   3. 在指定地方添加联通手机号
   4. 在编辑模式下打开 Surge, 并在配置文件最后(Scripts 内容下)添加`cron "00 12 * * *" debug=1,script-path=10010+.js`
      QuantumultX([[task_local] 标签下): `00 12 * * * 10010+.js`
   5. 保存
3. 注意 ⚠️
   1. 如果你想把文件放在云端，确保该文件是私密的，因为支付宝 api 返回的数据包含了你的真实姓名。
   2. 如果有问题，欢迎 [反馈](https://t.me/Leped_Bot)
