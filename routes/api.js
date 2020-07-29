var express = require('express');
var router = express.Router();

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

module.exports = router;