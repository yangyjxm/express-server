var express = require('express');
var router = express.Router();
const axios = require('axios');
const qs = require('qs');
const CronJob = require('cron').CronJob;
let finish = false

/* GET home page. */
router.get('', function (req, res, next) {
  res.render('test', {
    title: '测试专用链接'
  });
  let i = 0
  var AVenueJob = new CronJob('* * * * * *', function () {
    console.log(i++)
    if (i === 3) {
      finish = true
    }
    if (finish) {
      AVenueJob.stop()
    }
  }, null, true);

});

function test() {}

module.exports = router;