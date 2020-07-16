var express = require('express');
var router = express.Router();
const axios = require('axios');
const qs = require('qs');
const CronJob = require('cron').CronJob;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
  let i = 0
  // new CronJob('* * * * * *', function () {
    // console.log(i++)
    queryList()
  // }, null, true);
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

function queryList() {
  axios({
    url: 'http://www.chn-hyd.com/XMTYZX/api/services/app/XMVenueBill/GetVenueBillDataAsync',
    method: 'POST',
    headers: {
      'Host': 'www.chn-hyd.com',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Origin': 'http://www.chn-hyd.com',
      'X-XSRF-TOKEN': 'keLHH2uc5FNew0FiqvrG30SPD_X_RRf4Dy-bvfSiYYOYXk0-T4_eCYW6xo_pmUPO1rgf9Ac-DMY2TEZZjboNgS0zRZYauvM9a0oQQ2NITlxbpyw_yfmgnRkOumIU1OjTi_CXtpMvcxIR8_0tFDyMmQ2',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e25) NetType/WIFI Language/zh_CN',
      'Referer': 'http://www.chn-hyd.com/XMTYZX/AppDZ/XMTYZX/VenueBill?VenueTypeID=2e3fd9d7-9287-4c83-8d8c-b508c6813815',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN',
      'Cookie': 'Abp.Localization.CultureName=zh-CN; HT.EmpID=dd20b3e0-b4f3-4795-a111-43ddb34bfe31; XSRF-TOKEN=keLHH2uc5FNew0FiqvrG30SPD_X_RRf4Dy-bvfSiYYOYXk0-T4_eCYW6xo_pmUPO1rgf9Ac-DMY2TEZZjboNgS0zRZYauvM9a0oQQ2NITlxbpyw_yfmgnRkOumIU1OjTi_CXtpMvcxIR8_0tFDyMmQ2; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.PartID=29ceadd7-c18d-47c6-ad54-859b5f6ee93e; HT.ShopDisplayName=%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97; HT.ShopID=d47c81fe-0624-4717-b051-53751641468f; HT.Weixin.AppID=wxa6382ec61ee0837f; HT.Weixin.OpenID=o4XV71ADaY4A3gaiOtlP_Qse2Ov4; __RequestVerificationToken_L1hNVFlaWA2=UPQZYo-mpaEmjxIIVZMrfWWbdh_uRxxf959HvKZSugYfk00eA6toY7Poh6X7cUZEJNS6UkzePVDLN-NBRbztupQYyuvn_G0DFSXWU47WSWw1; .AspNet.ApplicationCookie=OI18anfVe56OJH2fGqaFHwOjDPyA3aHT2nL3kTgYKrjq89CBRY9QPVcEGXgsyisnDv087LCpgugApaBlC-Kdeaa4qTLrV7CXc4T-HCLH0-o15LkJlx5gcetQ6UhT0BUbTupqUYpUkGI1HAv3pVmZw4B8FhamHg_Yez0EKVPyOqCZdY17FwCV5-v1HJRJmmUoDeony7hsTKD_SUb2HIiZEQH6UKZP8segzzKDakkSccGckJA_dlzC0MEkjEdio3LIVVB8nNoooyV6gO-Zt5_X0-5ZmQkE9lLRkkAFP4pFcorxZTeF6MLik4st2LsuVj5oeuYCcsUAwzcGSlH7yE_zJ0vBcay5dtwq3QjtNmytIajF1oyOi8aKre1sSbyYTzEdy_fRCa0JhY8lok2VfS3ZLj_vQF4KrBKF2sJS9FCok9QGmYYFhBajK6p7xbBGbV-vSlLeqXacK7lwqZ3VKpYPYP3uHWxMEgLtBUtJRyWrsOcIy0iyEZ7MP53QtfPUZ9Z7SSQxDjMltdX5Oy3yDy9DoA3IyM0lARGZPB8yoZF6JQb4wZQ_pl2d_GjcfmfITH2Ck_JkoEAwCHe3gr5-MZE8BxEQeA0h5c0kDMs50ILMiIK3qHhpcd-tScd0t2bG4y4V5irw4ThKfXEYTak9e9tL-gjszDT5fRo_IvFxBjmMZL8; ASP.NET_SessionId=ffxp14de1p3gw4astcw4c0gy; HT.App.Type=10; HT.Weixin.ServiceType=20; http://www.chn-ht.com/identity/claims/LoginType=20',
      'Connection': 'keep-alive',
      'Content-Length': 181,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: {
      VenueTypeID: '2e3fd9d7-9287-4c83-8d8c-b508c6813815',
      webApiUniqueID: '6720c370-7961-d126-26b3-a56e51b8bae6',
      VenueTypeDisplayName: '',
      IsGetPrice: true,
      isApp: true,
      billDay: '2020-07-17'
    }
  }).then(res => {
    console.log(res.config);
    for (let index = 0; index < res.data.result.length; index++) {
      if (res.data.result[index].venueType.reportClass.indexOf('羽毛球') !== -1) {
        console.log(index + '响应消息：')
        console.log(res.data.result[index].listWeixinVenueStatus)
        // return
      }
    }
  }).catch(err => {
    console.log(err)
  }); 
}


module.exports = router;