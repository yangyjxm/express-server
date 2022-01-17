var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const axios = require("axios");
const dayjs = require("dayjs");
const calendar = require("../tools/calendar");

router.get("/remind", function (req, res, next) {
  res.render("birthday", {
    title: "node.js生日提醒",
  });
  const today = dayjs(new Date()).format("MM-DD");
  console.log(today + "服务启动");
  // 农历部分 start
  console.log("农历");
  let solarDay = calendar
    .solar2lunar(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    )
    .lunarDate.substr(5)
  console.log(solarDay);
  if (solarDay == "12-16") {
    sendMail("农历12月16", "yangyjxm@foxmail.com");
  } else {
    sendMail("非农历12月16", "yangyjxm@foxmail.com");
  }
  if (solarDay == "2-18") {
    sendMail("小亚记得祝妈妈生日快乐", "514933907@qq.com");
  }
  if (solarDay == "9-23") {
    sendMail("小亚记得祝爸爸生日快乐", "514933907@qq.com");
  }
  // 农历部分 end
  axios({
    url: "http://121.4.13.87:8888/birthday/get",
    method: "GET",
  }).then((res) => {
    let target = res.data.resultData.find(
      (obj) => obj.birthday.substr(5) === today
    );
    if (target != undefined) {
      sendMail("宝贝小亚记得祝" + target.name + "生日快乐", target.email);
      // 微信小程序推送
      // 獲取access_token
      // axios({
      //   url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa88115e813d1c9d8&secret=a934255da1c34a19e6161f898dcf06f8",
      //   method: "GET",
      // }).then((res) => {
      //   console.log("getAccessToken为：" + res.data.access_token);
      //   let access_token = res.data.access_token;
      //   // 下发模板消息
      //   axios({
      //     url:
      //       "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" +
      //       res.data.access_token,
      //     method: "POST",
      //     data: {
      //       touser: "o4uam5FsHYacKwXh7ST-0UhxKdNE", // 用户openid
      //       template_id: "tTskOIT7RycCenrNcXrQQDT9HDqIhVvipgNQKBcAC5E",
      //       page: "/pages/home/index",
      //       data: {
      //         thing2: {
      //           value: "宝贝小亚记得祝" + target.name + "生日快乐",
      //         },
      //         time3: {
      //           value:
      //             new Date().getFullYear() +
      //             "年" +
      //             new Date().getMonth() +
      //             1 +
      //             "月" +
      //             new Date().getDate() +
      //             "日 23:59",
      //         },
      //       },
      //     },
      //   }).then((res) => {
      //     console.log("宝贝小亚记得祝" + birthdayList[today] + "生日快乐");
      //   });
      // });
    }
  }).catch(() => {
    sendMail("请求主机java服务器错误", "yangyjxm@foxmail.com");
  });
});

// 发送邮件
function sendMail(text, to) {
  let transport = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: true,
    port: 465,
    auth: {
      user: "yangyjxm@foxmail.com",
      pass: "gxssvocidaalbhhg",
    },
  });
  transport.sendMail(
    {
      from: "你的小羊 yangyjxm@foxmail.com",
      to,
      subject: "生日提醒",
      text,
    },
    function (err, res) {
      if (err) console.log(err);
      else console.log(res.response);
    }
  );
}

module.exports = router;
