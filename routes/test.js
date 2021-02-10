var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const axios = require("axios");
const qs = require("qs");
const CronJob = require("cron").CronJob;
let finish = false;
var child_process = require('child_process');

router.get("/execFile", function (req, res, next) {
  res.render("test", {
    title: "node.js测试专用链接",
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
    title: "node.js测试专用链接",
  });
  child_process.exec("bash /code/fronted_deploy.sh", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('错误信息: ' + error);
    }
  });
});

module.exports = router;