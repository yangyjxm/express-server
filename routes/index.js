var express = require('express');
var router = express.Router();

router.get('/venueBot', function (req, res, next) {
  res.render('index', {
    title: '【厦门市体育中心】公众号抢场机器人'
  });
});

module.exports = router;