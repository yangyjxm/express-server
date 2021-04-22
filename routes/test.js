var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const axios = require("axios");
const qs = require("qs");
const dayjs = require("dayjs");
const CronJob = require("cron").CronJob;
let nowValue = 0;
var child_process = require('child_process');

router.get("/execFile", function (req, res, next) {
  res.render("test", {
    title: "y-nav前端自动化部署",
  });
  child_process.execFile("/code/fronted_deploy.sh", {
    shell: '/bin/bash'
  }, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('错误信息: ' + error);
    }
  });
});

router.get("/exec", function (req, res, next) {
  res.render("test", {
    title: "前端自动化部署",
  });
  child_process.exec("bash /code/fronted_deploy.sh", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('错误信息: ' + error);
    }
  });
});


// 东吉ticket-504-5e4d45b274b9ad-555c-4472-afbd-ab3031a06ce7
// 小玲ticket-504-5e4d45cfb61d25-095f-4a5c-9ec6-25e10d57bb17
router.get("/question", function (req, res, next) {
  let token = req.query.token
  let target = req.query.target
  res.render("test", {
    title: "答题",
    desc: "本次目标积分：" + req.query.target
  });
  console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss ') + '本次目标积分：' + target);
  let t = 10000; // 初始时间间隔，不能太小，太小会内存溢出
  var set1 = setInterval(fn, t);

  function fn() {
    t = Math.floor(Math.random() * 25 * 1000) + 22 * 1000 // 答题间隔控制在18s~40s之间
    clearInterval(set1);
    if (nowValue <= target) {
      answerToQuestion(token, target)
      set1 = setInterval(fn, t);
    } else {
      console.log('本次学习已完成！');
    }
  }
});

// 答题方法
function answerToQuestion(token, target) {
  axios({
    url: "https://api.u.ccb.com/v1/ote/ga/lib/8b6133ed-08f5-4a62-b6e1-c24aef7dd731/point/7899a7d5-6e0a-4ee4-8f4b-23d97f52ef23/floor/30?r=0.37864379120166813",
    method: "GET",
    headers: {
      "Host": "api.u.ccb.com",
      "Content-Type": "application/json",
      "Origin": "https://m.u.ccb.com",
      "Accept-Encoding": "br, gzip, deflate",
      "Connection": "keep-alive",
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) MicroMessenger/2.3.27(0x12031b13) MacWechat NetType/WIFI WindowsWechat",
      "Referer": "https://m.u.ccb.com/g/?r=0.21987192345698836",
      "Token": token,
      "Accept-Language": "zh-cn"
    }
  }).then((res) => {
    let results = []
    for (obj of res.data.questions) {
      results.push({
        questionId: obj.id,
        result: obj.items.find(i => i.isAnswer == 1).id,
        title: obj.title
      })
    }
    // console.log(results);
    axios({
      url: "https://api.u.ccb.com/v1/ote/ga/lib/8b6133ed-08f5-4a62-b6e1-c24aef7dd731/point/7899a7d5-6e0a-4ee4-8f4b-23d97f52ef23?r=0.46838990639915457",
      method: "POST",
      headers: {
        "Host": "api.u.ccb.com",
        "Content-Type": "application/json",
        "Origin": "https://m.u.ccb.com",
        "Accept-Encoding": "br, gzip, deflate",
        "Connection": "keep-alive",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) MicroMessenger/2.3.27(0x12031b13) MacWechat NetType/WIFI WindowsWechat",
        "Referer": "https://m.u.ccb.com/g/?r=0.21987192345698836",
        "Token": token,
        "Accept-Language": "zh-cn",
        "Content-Length": 707
      },
      data: {
        "floor": 4,
        "floorValue": 200,
        "floorPassed": 1,
        "results": [{
          "questionId": results[0].questionId,
          "result": results[0].result,
          "resultValue": 10,
          "isTrue": 1
        }, {
          "questionId": results[1].questionId,
          "result": results[1].result,
          "resultValue": 15,
          "isTrue": 1
        }, {
          "questionId": results[2].questionId,
          "result": results[2].result,
          "resultValue": 20,
          "isTrue": 1
        }, {
          "questionId": results[3].questionId,
          "result": results[3].result,
          "resultValue": 25,
          "isTrue": 1
        }, {
          "questionId": results[4].questionId,
          "result": results[4].result,
          "resultValue": 130,
          "isTrue": 1
        }]
      }
    }).then((response) => {
      console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss ') + response.data.userInfo.cName + "当前积分：" + response.data.userInfo.totalValue);
      nowValue = response.data.userInfo.totalValue
    })
  }).catch(err => {
    console.log("请求失败");
  });

}

router.get("/answer", function (req, res, next) {
  res.render("test", {
    title: "加分"
  });
  axios({
    url: "https://api.u.ccb.com/v1/ote/ga/lib/8b6133ed-08f5-4a62-b6e1-c24aef7dd731/point/7899a7d5-6e0a-4ee4-8f4b-23d97f52ef23?r=0.46838990639915457",
    method: "POST",
    headers: {
      "Host": "api.u.ccb.com",
      "Content-Type": "application/json",
      "Origin": "https://m.u.ccb.com",
      "Accept-Encoding": "br, gzip, deflate",
      "Connection": "keep-alive",
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) MicroMessenger/2.3.27(0x12031b13) MacWechat NetType/WIFI WindowsWechat",
      "Referer": "https://m.u.ccb.com/g/?r=0.21987192345698836",
      "Token": "ticket-504-5e4d45c3668f52-2b58-49e1-ad25-52397aa14065",
      "Accept-Language": "zh-cn",
      "Content-Length": 707
    },
    data: {
      "floor": 4,
      "floorValue": 200,
      "floorPassed": 1,
      "results": [{
        "questionId": "2cd15cf3-4e28-4a0c-9c02-7c1e32ad9074",
        "result": "ed50d9d9-fd49-4723-a37d-e0e41ea319c6",
        "resultValue": 10,
        "isTrue": 1
      }, {
        "questionId": "36f5ceb9-be87-4a0d-8d31-012fa47ae944",
        "result": "26626869-6cbd-489a-b0fa-303da913014c",
        "resultValue": 15,
        "isTrue": 1
      }, {
        "questionId": "237673ae-1eca-40ea-94bf-b060710fa92a",
        "result": "9f8420cd-922b-4211-bb9c-7042593b113d",
        "resultValue": 20,
        "isTrue": 1
      }, {
        "questionId": "1d7457b8-b0ae-47b1-a5ab-5920c4d56069",
        "result": "1697f167-f51c-4125-afa5-785eddab8387",
        "resultValue": 25,
        "isTrue": 1
      }, {
        "questionId": "3812e2f3-5441-463a-9ce9-05d615dd50a1",
        "result": "849a5dce-f90b-4356-afed-1487dca2c926",
        "resultValue": 130,
        "isTrue": 1
      }]
    }
  }).then((res) => {
    console.log("当前积分：" + res.data.userInfo.totalValue);
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;