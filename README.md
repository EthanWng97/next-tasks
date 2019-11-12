# Profiles

## Filter - Ruleset of Surge and QuantumultX

## Scripts

### filter_conversion.js
**powered by CLOUDFLARE Workers**

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/process.jpeg" height="70%" width="70%">

1. Features
    1. Generate Surge Ruleset from QuantumultX filter link and vice versa.
    2. Change Ruleset automatically if source file changed.
2. Instructions
    1. create new worker in Cloudflare 
    2. copy all contents in Editor
    3. Fill in required content (url and replace regex)
    4. Save and Deploy
    5. Enjoy ur life
   
### checkin.js
**By [Neurogram](https://github.com/Neurogram-R) feat [NavePnow](https://github.com/NavePnow)**

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/IMAGE 2019-11-12 19:57:53.jpg" height="50%" width="50%">

1. Features
   1. Show Used data, Rest data and Due date
   2. Using Cron to run scripts periodically
2. Instructions
   1. `https://www.notion.so/Check-in-0797ec9f9f3f445aae241d7762cf9d8b`
   2. Check the data format and modify the regex if something goes wrong

### checkin_1point.js
**By [NavePnow](https://github.com/NavePnow) feat [wangfei021325](https://t.me/wangfei021325)**

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/IMAGE 2019-11-12 19:58:49.jpg" height="50%" width="50%">
Auto check-in for 1point3acres.com

[Tutorial](https://nave.work/2019/11/07/%E4%B8%80%E4%BA%A9%E4%B8%89%E5%88%86%E5%9C%B0%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%88%B0%E8%84%9A%E6%9C%AC/#check-in-for-surge)

### 10010+.js
**By [NavePnow](https://github.com/NavePnow)**
Modified according to the Jsbox script from author [coo11](https://t.me/coo11) 

<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/IMG_0666.PNG" height="50%" width="50%">

1. Features
   1. Show Rest time, Rest fee and Rest flow
   2. Using Cron to run scripts periodically
2. Instructions
   1. set your China Unicom number in Mini Program of Alipay (provided api)
   2. create 10010+.js under Surge folder and copy all the content of [link](https://raw.githubusercontent.com/NavePnow/Profiles/master/Scripts/10010%2B.js)
   3. add your phone number into required place
   4. Open Surge in Edit mode and write `cron "00 12 * * *" debug=1,script-path=10010+.js` below the config
   5. Save it and enjoy your life
    
3. Something you know know
    1. If you want to put the file online, make sure keep it private because the response data of Alipay provide your REAL NAME.
    2. Feel free to [contact me](https://t.me/Leped_Bot) if you have any problem.


# Tip Jar
If you're really, really enjoying the content, you can leave extra tips to support the developer. Thanks for even considering.
<img src="https://raw.githubusercontent.com/NavePnow/blog_photo/master/IMG_0667.JPG" height="50%" width="50%">
