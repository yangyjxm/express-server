var express = require('express');
var router = express.Router();

var db = require('../db/db'); //引入db
var userSql = require('../db/userSql');

router.get("/getAllLoans", function (req, res, next) {
  var results = {};
  db.query(userSql.query, [], function (err, rows) {
    results = rows;
    console.log("results: " + results.str);
    res.send(results);
  });
});

module.exports = router;