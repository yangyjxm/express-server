var express = require('express');
var router = express.Router();
const axios = require('axios');
const CronJob = require('cron').CronJob;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
  let i = 0
  new CronJob('* * * * * *', function () {
    console.log(i++)
  }, null, true);
});

function addLoan() {
  axios.post('http://111.229.251.142/api/weapp/addLoan', {
    'title': 'express server test',
    'status': 0,
    'createBy': '杨',
    'createTime': new Date()
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err)
  });

}



module.exports = router;