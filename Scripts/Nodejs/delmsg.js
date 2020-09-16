/*
Server Info
 
关于作者

NavePnow
    Telegram: NavePnow
    GitHub: NavePnow
*/

var token = '';

var chat_id = "";
var url = "https://api.telegram.org/bot" + token;
const request = require('request');
const fs = require("fs");

function sleep(delay) {
    for (var t = Date.now(); Date.now() - t <= delay;);
}

function getStartID() {
    request({
        url: url + "/sendMessage?chat_id=" + chat_id + "&text=Memories%20are%20wiped%20now!",
        json: true
    }, function (error, reponse, body) {
        if (!error && reponse.statusCode == 200) {
            startID = body.result.message_id;
            getOriginalData(startID)
        }
    })
}

function getOriginalData(startID){
    request({
        url: url + "/getUpdates",
        json: true
    }, function (error, reponse, body) {
        if (!error && reponse.statusCode == 200) {
            data = body.result;
            delMessage(startID, data)
        }
    })
}

function delMessage(startID, data) {
    // delete message
    if (data != "") {
        for (i = 0; i < data.length; i++) {
            try {
                sleep(50);
                request({
                    url: url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + data[i].message.message_id,
                });
            } catch (e) {
                console.log(e)
            }
        }

        // update link for getUpdate
        value = data[data.length - 1].update_id + 1
        request({
            url: url + "/getUpdates?offset=" + value,
            json: true
        }, function (error, reponse, body) {
            if (!error && reponse.statusCode == 200) {
                data = body.result;
                delMessage(startID, data)
            }
        })
    } else delWipe(startID);

}

function delWipe(startID) {
    // delete wipe memory
    request({
        url: url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + startID,
        json: true
    })
    delWelcome()
}

function delWelcome(){
    // delete welcome to eastworld
    fs.readFile('info.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data.toString())
        try {
            request({
                url: url + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + data.toString(),
            })
        } catch (e) {
        }
    });
    printWelome()
}

function printWelome(){
    request({
        url: url + "/sendMessage?chat_id=" + chat_id + "&text=Welcome%20to%20Eastworld!",
        json: true
    }, function (error, reponse, body) {
        if (!error && reponse.statusCode == 200) {
            endID = body.result.message_id;
            console.log(endID)
            savetoFile(endID)
        }
    })
}

function savetoFile(endID){
    fs.writeFile('info.txt', endID.toString(), function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

const schedule = require('node-schedule');

const scheduleCronstyle = () => {
    schedule.scheduleJob('0 21 0 * * *', () => {
        getStartID()
    });
}

// scheduleCronstyle();        
getStartID()
