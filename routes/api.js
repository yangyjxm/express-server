var express = require('express');
var router = express.Router();
var child_process = require('child_process');
const nodemailer = require("nodemailer");
const axios = require("axios")
const CronJob = require("cron").CronJob;

var db = require('../db/db'); //引入db
var WishSql = require('../db/WishSql');

router.get("/getWish", function (req, res, next) {
  db.query(WishSql.select, [], function (err, rows) {
    res.send({
      code: 200,
      message: '查询成功'
    });
  });
});

router.post("/addWish", function (req, res, next) {
  let param = req.body;
  console.log(req.body)
  db.query(WishSql.insert, [param.wishName, param.createDate, param.createBy], function (err, rows) {
    res.send({
      code: 200,
      message: '插入成功'
    });
  });
});

router.get("/execFile", function (req, res, next) {
  res.render("test", {
    title: "node.js测试专用链接execFile",
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
    title: "node.js测试专用链接exec",
  });
  child_process.exec("bash /code/fronted_deploy.sh", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('错误信息: ' + error);
    }
  });
});

router.get("/birthday", function (req, res, next) {
  let access_token = "";
  res.render("birthday", {
    title: "node.js生日提醒",
  });

  let birthdayList = {
    "1/13": "香港姐",
    // "2/10": "测试兄弟",
    "4/13": "杨扬",
    "4/20": "李彤",
    "9/14": "李若",
    "9/28": "迟子璇",
  };
  // console.log("邮件start");
  // let today = new Date().getMonth() + 1 + "/" + new Date().getDate();
  // sendMail("宝贝小亚记得祝" + birthdayList[today] + "生日快乐", "yangyjxm@foxmail.com")
  // console.log("邮件end");
  new CronJob(
    "0 0 0 * * * ",
    function () {
      console.log("触发启动");
      let today = new Date().getMonth() + 1 + "/" + new Date().getDate();
      console.log(birthdayList[today]);
      if (birthdayList[today]) {
        sendMail("宝贝小亚记得祝" + birthdayList[today] + "生日快乐", "yangyjxm@foxmail.com")
        // sendMail("宝贝小亚记得祝" + birthdayList[today] + "生日快乐", "514933907@qq.com")

        // 獲取access_token
        axios({
          url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa88115e813d1c9d8&secret=a934255da1c34a19e6161f898dcf06f8",
          method: "GET",
        }).then((res) => {
          // console.log("getAccessToken为：" + res.data.access_token);
          access_token = res.data.access_token;
          // 下发模板消息
          axios({
            url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" +
              res.data.access_token,
            method: "POST",
            data: {
              touser: "o4uam5FsHYacKwXh7ST-0UhxKdNE",
              template_id: "tTskOIT7RycCenrNcXrQQDT9HDqIhVvipgNQKBcAC5E",
              page: "/pages/home/index/index",
              data: {
                thing2: {
                  value: "宝贝小亚记得祝" + birthdayList[today] + "生日快乐",
                },
                time3: {
                  value: new Date().getFullYear() + "年" + new Date().getMonth() + 1 + "月" + new Date().getDate() + "日 23:59",
                },
              },
            },
          }).then((res) => {
            console.log("宝贝小亚记得祝" + birthdayList[today] + "生日快乐");
          });
        });
      }
    },
    null,
    true
  );
  return false;
});

function sendMail(text, to) {
  let transport = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: true,
    port: 465,
    auth: {
      user: "yangyjxm@foxmail.com",
      pass: "xdjjzcrkrzbubiai",
    },
  });
  transport.sendMail({
      from: "羊 yangyjxm@foxmail.com",
      to,
      subject: "生日提醒",
      text
    },
    function (err, res) {
      if (err) console.log(err);
      else console.log(res);
    }
  );
}

module.exports = router;