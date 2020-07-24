var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
const qs = require('qs');
const CronJob = require('cron').CronJob;
let finish = false

/* GET home page. */
router.get('', function (req, res, next) {
  let i = 0
  res.render('test', {
    title: '测试专用链接'
  });
  // console.log(i)
  // console.log(req.query.date)
  // res.end('你好')
  var AVenueJob = new CronJob('* * * * * *', function () {
    console.log(i++)
    // sendMail()
    // if (i === 1) {
    //   finish = true
    // }
    // if (finish) {
    //   AVenueJob.stop()
    // }
  }, null, true);
});

function sendMail() {
  let transport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 465,
    auth: {
      user: "yangyjxm@foxmail.com",
      pass: "xdjjzcrkrzbubiai"
    }
  })
  transport.sendMail({
    from: '厦门市体育中心 yangyjxm@foxmail.com',
    to: 'yangyjxm@foxmail.com',
    subject: '球场预定成功',
    text: '本周球场已经预定成功'
  }, function (err, res) {
    if (err) console.log(err)
    else console.log(res)
  })
}

module.exports = router;