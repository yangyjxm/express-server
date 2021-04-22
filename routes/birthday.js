var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const axios = require("axios")
const dayjs = require("dayjs")

router.get("/remind", function (req, res, next) {
  res.render("birthday", {
    title: "node.js生日提醒",
  });
  const today = dayjs(new Date).format('MM-DD')
  console.log(today + "服务启动");
  axios({
    url: "https://yangyjxm.top/api/birthday/get",
    method: "GET",
  }).then(res => {
    let target = res.data.resultData.find(obj => obj.birthday.substr(5) === today)
    console.log(target);
    if (target.name) {
      sendMail("宝贝小亚记得祝" + target.name + "生日快乐", target.email)
      // 微信小程序推送
      // 獲取access_token
      axios({
        url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa88115e813d1c9d8&secret=a934255da1c34a19e6161f898dcf06f8",
        method: "GET",
      }).then((res) => {
        console.log("getAccessToken为：" + res.data.access_token);
        let access_token = res.data.access_token;
        // 下发模板消息
        axios({
          url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" +
            res.data.access_token,
          method: "POST",
          data: {
            touser: "o4uam5FsHYacKwXh7ST-0UhxKdNE", // 用户openid
            template_id: "tTskOIT7RycCenrNcXrQQDT9HDqIhVvipgNQKBcAC5E",
            page: "/pages/home/index",
            data: {
              thing2: {
                value: "宝贝小亚记得祝" + target.name + "生日快乐",
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
  })
});

// 发送邮件
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
      from: "你的小羊 yangyjxm@foxmail.com",
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