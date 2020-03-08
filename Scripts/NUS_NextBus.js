/**erots
id: 5e649a8d40595e0008b33ef0
build: 1
source: 61451e11727e4e5cbeee7153355d1600
*/

let containerid = {
    热门: "102803",
    小时: "102803_ctg1_9999_-_ctg1_9999",
    昨日: "102803_ctg1_8899_-_ctg1_8899",
    前日: "102803_ctg1_8799_-_ctg1_8799",
    周榜: "102803_ctg1_8698"
};
const EARTH_RADIUS = 6378.137
function GetLocation(){
    let available = $location.available;
    if (available)
    {
        $location.fetch({
            handler: function (resp) {
                var lat = resp.lat
                var lng = resp.lng
                GetNearestLoc(lat, lng)
            }
        }
        )
    }
    else
    {
        console.log("获取位置信息失败！")
    }
}
function rad(data){
    return data * Math.PI / 180.0
}

function GetNearestLoc(lat, lng){
    $http.get({
        url: "https://nnextbus.nus.edu.sg/BusStops",
        header: {
            "Authorization": "Basic TlVTbmV4dGJ1czoxM2RMP3pZLDNmZVdSXiJU",
        },
        handler: function (resp) {
            let data = resp.data;
            let name = ""
            let distance = 1000;
            if (data.errmsg) {
                alert(data.errmsg);
                return;
            }
            data = resp.data.BusStopsResult.busstops
            // console.log(data)
            count = data.length
            for( let i = 0; i < count; i++){
                tmp_lat = data[i].latitude
                tmp_lng = data[i].longitude
                // tmp_distance = (Math.sqrt(Math.pow((tmp_lat - lat), 2) + Math.pow((tmp_lng - lng), 2)))*1000;
                radLat1 = rad(tmp_lat);
                radLat2 = rad(lat);
                a = radLat1 - radLat2;
                b = rad(tmp_lng) - rad(lng);
                s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
                s = s * EARTH_RADIUS;
                tmp_distance = Math.round(s * 10000) / 10000;
                if (tmp_distance < distance){
                    distance = tmp_distance;
                    name = data[i].name;
                    caption = data[i].caption;
                }
            }
            GetInfo(name, caption)

        }
    });
}

function GetInfo(name, caption){
    $http.get({
        url: "https://nnextbus.nus.edu.sg/ShuttleService?busstopname=" + name,
        header: {
            "Authorization": "Basic TlVTbmV4dGJ1czoxM2RMP3pZLDNmZVdSXiJU",
        },
        handler: function (resp) {
            if (resp.data.errmsg) {
                alert(data.errmsg);
                return;
            }
            let time = resp.data.ShuttleServiceResult.TimeStamp;
            time = time.substring(11, 19)
            data = resp.data.ShuttleServiceResult.shuttles
            console.log(caption)
            console.log(time)
            // console.log(data)
            count = data.length
            for (let i = 0; i < count; i++) {
                // A1 33min 63min
                name = data[i].name;
                arrivalTime = data[i].arrivalTime;
                nextArrivalTime = data[i].nextArrivalTime
                string = name.padEnd(3) + " " + arrivalTime.padEnd(2) + " mins " + nextArrivalTime.padEnd(2) + " mins"
                console.log(string)
            }

        }
    });
}

const template = {
    views: [
        {
            type: "label",
            props: {
                id: "label",
                textColor: $color("black"),
                align: $align.center,
                font: $font(14)
            },
            layout: function (make, view) {
                make.right.top.bottom.inset(0);
                make.left.inset(15);
            }
        },
        {
            type: "label",
            props: {
                id: "icon",
                bgcolor: $rgb(254, 158, 25),
                text: "热",
                textColor: $color("white"),
                radius: 2,
                font: $font("bold", 11),
                align: $align.center,
                alpha: 0.8,
                hidden: true
            },
            layout: function (make, view) {
                make.right.inset(15);
                make.width.equalTo(15);
                make.height.equalTo(15);
                make.centerY.equalTo();
            },
            events: {
                tapped: function (sender) { }
            }
        }
    ]
};

function weiboList(temp) {
    return {
        type: "list",
        props: {
            id: "hotList",
            template: temp,
            //data:options
            bgcolor: $color("clear"),
            hidden: true,
            rowHeight: 35,
            actions: [
                {
                    title: "微博",
                    color: $rgb(246, 22, 31), // default to gray
                    handler: function (sender, indexPath) {
                        $cache.set("app", "weibo");
                        $app.openURL(sender.data[indexPath.row].label.info);
                    }
                },
                {
                    title: "墨客",
                    color: $rgb(69, 134, 209),
                    handler: function (sender, indexPath) {
                        $cache.set("app", "moke");
                        if (mode == "fireList") {
                            $app.openURL(
                                "moke:///status?mid=" + sender.data[indexPath.row].label.id
                            );
                        } else {
                            let text = /.、([\s\S]*)/g.exec(
                                sender.data[indexPath.row].label.text
                            )[1];
                            $app.openURL("moke:///search/statuses?query=" + encodeURI(text));
                        }
                    }
                }
            ]
        },
        layout: function (make, view) {
            make.left.right.top.inset(0);
            make.bottom.inset(0);
        },
        events: {
            didSelect: function (sender, indexPath) {
                let app = $cache.get("app") || "weibo";

                let name = sender.data[indexPath.row].label.infoname;
                url = "http://s.weibo.com/weibo?q=%23" + name + "%23&Refer=top";
                console.log(url);

                $ui.push({
                    props: {
                        title: name,
                        navBarHidden: true
                    },
                    views: [
                        {
                            type: "web",
                            props: {
                                url: encodeURI(url)
                            },
                            layout: function (make, view) {
                                make.left.right.inset(0);
                                make.bottom.inset(0);
                                make.top.inset(-45);
                            }
                        }
                    ]
                });
            },
            didLongPress: function (sender, indexPath, data) {
                let name = sender.data[indexPath.row].label.infoname;
                console.log(name);
                url = "http://s.weibo.com/weibo?q=%23" + name + "%23&Refer=top";
                $share.sheet(encodeURI(url));
            },
            pulled: function (sender) {
                $("hotList").remove();

                $("weibo").add(weiboList(template));
                getHotSearch();
            }
        }
    };
}

function show() {
    $ui.render({
        props: {
            title: "微博热点",
            id: "weibo"
            //      navBarHidden:true,
        },
        views: [weiboList(template)]
    });
}

function getHotSearch(mode = "hotSearch") {
    //  $ui.toast("载入中", 10);
    $http.get({
        url: hotSeachApi,
        handler: function (resp) {
            let data = resp.data;
            if (data.errmsg) {
                alert(data.errmsg);
                return;
            }
            mode = 0;
            let hotCards = data.cards[0].card_group;
            $("hotList").data = [];

            $("hotList").hidden = false;

            for (let i = 0; i < hotCards.length; i++) {
                let icon = {};
                let prefix = "";
                if (mode == 0) {
                    let num = i;
                    if (i == 0) num = "🏆";
                    else if (i == 1) num = "🥇";
                    else if (i == 2) num = "🥈";
                    else if (i == 3) num = "🥉";
                    prefix = num + "、";
                    console.log(hotCards[i].icon)
                    if (hotCards[i].icon) {
                        if (hotCards[i].icon.indexOf("hot") > 0) {
                            icon.hidden = false;
                            icon.text = "热";
                            icon.bgcolor = $rgb(254, 158, 25);
                        } else if (hotCards[i].icon.indexOf("new") > 0) {
                            icon.hidden = false;
                            icon.text = "新";
                            icon.bgcolor = $rgb(254, 73, 95);
                        } else if (hotCards[i].icon.indexOf("recom") > 0) {
                            icon.hidden = false;
                            icon.text = "荐";
                            icon.bgcolor = $rgb(76, 173, 254);
                        } else if (hotCards[i].icon.indexOf("fei") > 0) {
                            icon.hidden = false;
                            icon.text = "沸";
                            icon.bgcolor = $rgb(247, 98, 0);
                        }
                    }
                    $("hotList").data = $("hotList").data.concat({
                        label: {
                            text: prefix + hotCards[i].desc,
                            info: hotCards[i].scheme,
                            infoname: hotCards[i].desc
                        },
                        icon: icon
                    });
                } else {
                    if (hotCards[i].icon) {
                        if (hotCards[i].icon.indexOf("sheng") > 0) {
                            icon.hidden = false;
                            icon.text = "⤴︎";
                            icon.bgcolor = $rgb(254, 75, 95);
                        }
                    }
                }
            }

            $ui.toast(timeConvert(data.pageInfo.starttime) + "  更新", 1);
        }
    });
    //  alert($props($("tab")))
}

function timeConvert(unixTime) {
    let date = new Date(unixTime * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dateN = date.getDate();
    // Will display time in 10:30:23 format
    let formattedTime =
        year +
        "-" +
        month +
        "-" +
        dateN +
        "  " +
        hours +
        ":" +
        minutes.substr(-2) +
        ":" +
        seconds.substr(-2);
    return formattedTime;
}

function run() {
    // show();
    // getHotSearch();
    GetLocation();
}

run();
