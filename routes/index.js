var express = require('express');
var router = express.Router();
const axios = require('axios');
const qs = require('qs');
const CronJob = require('cron').CronJob;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '【厦门市体育中心】公众号抢场机器人'
  });
  let i = 0
  let billDay = '2020-07-26'
  var AVenueJob = new CronJob('*/10 * * * * 5', function () {
    queryVenueInfo(billDay, '2e3fd9d7-9287-4c83-8d8c-b508c6813815')
  }, null, true);
  var BVenueJob = new CronJob('5/10 * * * * 5', function () {
    console.log('B场地请求时间：' + new Date())
    queryVenueInfo(billDay, '08abed5d-6e76-4c7a-a1a2-aeaf38a38a0d')
  }, null, true);
});

// 获取当前场地信息列表
function queryVenueInfo(billDay, VenueTypeID) {
  axios({
    url: 'http://www.chn-hyd.com/XMTYZX/api/services/app/XMVenueBill/GetVenueBillDataAsync',
    method: 'POST',
    data: {
      VenueTypeID,
      VenueTypeDisplayName: '',
      IsGetPrice: true,
      isApp: true,
      billDay,
      webApiUniqueID: '6720c370-7961-d126-26b3-a56e51b8bae6'
    },
    headers: {
      'Host': 'www.chn-hyd.com',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Origin': 'http://www.chn-hyd.com',
      'X-XSRF-TOKEN': 'keLHH2uc5FNew0FiqvrG30SPD_X_RRf4Dy-bvfSiYYOYXk0-T4_eCYW6xo_pmUPO1rgf9Ac-DMY2TEZZjboNgS0zRZYauvM9a0oQQ2NITlxbpyw_yfmgnRkOumIU1OjTi_CXtpMvcxIR8_0tFDyMmQ2',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e25) NetType/WIFI Language/zh_CN',
      'Referer': 'http://www.chn-hyd.com/XMTYZX/AppDZ/XMTYZX/VenueBill?VenueTypeID=' + VenueTypeID,
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN',
      'Cookie': 'Abp.Localization.CultureName=zh-CN; HT.EmpID=dd20b3e0-b4f3-4795-a111-43ddb34bfe31; XSRF-TOKEN=keLHH2uc5FNew0FiqvrG30SPD_X_RRf4Dy-bvfSiYYOYXk0-T4_eCYW6xo_pmUPO1rgf9Ac-DMY2TEZZjboNgS0zRZYauvM9a0oQQ2NITlxbpyw_yfmgnRkOumIU1OjTi_CXtpMvcxIR8_0tFDyMmQ2; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.PartID=29ceadd7-c18d-47c6-ad54-859b5f6ee93e; HT.ShopDisplayName=%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97; HT.ShopID=d47c81fe-0624-4717-b051-53751641468f; HT.Weixin.AppID=wxa6382ec61ee0837f; HT.Weixin.OpenID=o4XV71ADaY4A3gaiOtlP_Qse2Ov4; __RequestVerificationToken_L1hNVFlaWA2=UPQZYo-mpaEmjxIIVZMrfWWbdh_uRxxf959HvKZSugYfk00eA6toY7Poh6X7cUZEJNS6UkzePVDLN-NBRbztupQYyuvn_G0DFSXWU47WSWw1; .AspNet.ApplicationCookie=OI18anfVe56OJH2fGqaFHwOjDPyA3aHT2nL3kTgYKrjq89CBRY9QPVcEGXgsyisnDv087LCpgugApaBlC-Kdeaa4qTLrV7CXc4T-HCLH0-o15LkJlx5gcetQ6UhT0BUbTupqUYpUkGI1HAv3pVmZw4B8FhamHg_Yez0EKVPyOqCZdY17FwCV5-v1HJRJmmUoDeony7hsTKD_SUb2HIiZEQH6UKZP8segzzKDakkSccGckJA_dlzC0MEkjEdio3LIVVB8nNoooyV6gO-Zt5_X0-5ZmQkE9lLRkkAFP4pFcorxZTeF6MLik4st2LsuVj5oeuYCcsUAwzcGSlH7yE_zJ0vBcay5dtwq3QjtNmytIajF1oyOi8aKre1sSbyYTzEdy_fRCa0JhY8lok2VfS3ZLj_vQF4KrBKF2sJS9FCok9QGmYYFhBajK6p7xbBGbV-vSlLeqXacK7lwqZ3VKpYPYP3uHWxMEgLtBUtJRyWrsOcIy0iyEZ7MP53QtfPUZ9Z7SSQxDjMltdX5Oy3yDy9DoA3IyM0lARGZPB8yoZF6JQb4wZQ_pl2d_GjcfmfITH2Ck_JkoEAwCHe3gr5-MZE8BxEQeA0h5c0kDMs50ILMiIK3qHhpcd-tScd0t2bG4y4V5irw4ThKfXEYTak9e9tL-gjszDT5fRo_IvFxBjmMZL8; ASP.NET_SessionId=ffxp14de1p3gw4astcw4c0gy; HT.App.Type=10; HT.Weixin.ServiceType=20; http://www.chn-ht.com/identity/claims/LoginType=20',
      'Connection': 'keep-alive',
      'Content-Length': 181,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log('一、获取满足条件的场地列表成功√')
    let venueList = res.data.result[0].listWeixinVenueStatus // 获取到的数据列表
    let minutes = 0 // 可以玩的时间
    let okVenueList = [] // 可以玩的场次列表

    console.log((VenueTypeID === '2e3fd9d7-9287-4c83-8d8c-b508c6813815' ? 'A区' : 'B区') + '场地请求时间：' + new Date())
    console.log('╔════════════════════════' + billDay + '大于90分钟的场地列表════════════════════════╗')
    for (let index = 0; index < venueList.length - 1; index++) {
      minutes = (new Date(venueList[index + 1].startTime) - new Date(venueList[index].endTime)) / 60 / 1000
      if (minutes >= 90) {
        console.log('║场地ID：' + venueList[index].venueID + '，开始时间：' + venueList[index].endTime.substr(11, 5) + '，可以玩：' + minutes + '分钟║')
      }
    }
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝')

    console.log('╔═════════════════════════' + billDay + '满足条件的场地列表═════════════════════════╗')
    for (let index = 0; index < venueList.length - 1; index++) {
      minutes = (new Date(venueList[index + 1].startTime) - new Date(venueList[index].endTime)) / 60 / 1000
      // 筛选能打90分钟以上且为下午14:00后的场地
      if (minutes >= 90 && venueList[index].endTime.substr(11, 2) >= 14 && venueList[index].endTime.substr(11, 2) <= 15) {
        console.log('║场地ID：' + venueList[index].venueID + '，开始时间：' + venueList[index].endTime.substr(11, 5) + '，可以玩：' + minutes + '分钟║')
        okVenueList.push({
          ...venueList[index],
          minutes
        })
      }
    }
    console.log('╚══════════════════════════════════════════════════════════════════════════════╝')

    let startTime = parseInt(okVenueList[0].endTime.substr(11, 2) * 60) + parseInt(okVenueList[0].endTime.substr(14, 2))
    let data = {
      billDay,
      listData: [],
      webApiUniqueID: '6720c370-7961-d126-26b3-a56e51b8bae6'
    } // 订场专用json
    // for (let i = 0; i < okVenueList[0].minutes / 30; i++) {
    for (let i = 0; i < 3; i++) {
      data.listData.push({
        venueID: okVenueList[0].venueID,
        startTime: startTime + i * 30,
        endTime: startTime + 30 + i * 30,
        billValue: 32.5,
        realValue: 32.5,
        // venueDisplayName: '14号场',
        // venueTypeDisplayName: '综合馆羽毛球场A区'
      })
    }
    // 预定场地
    orderVenue(data, VenueTypeID)
  }).catch(err => {
    console.log('一、获取满足条件的场地列表失败×')
  });
}

// 预定场地
function orderVenue(data, VenueTypeID) {
  axios({
    url: 'http://www.chn-hyd.com/XMTYZX/api/services/app/XMVenueBill/WeiXinVenueBillAsync',
    method: 'POST',
    data,
    headers: {
      'Host': 'www.chn-hyd.com',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Origin': 'http://www.chn-hyd.com',
      'X-XSRF-TOKEN': 'wQx0ZZHm_NNcmOmCEln4E4aWakOJe3A_wU0_PMJM_8YijNVucE5cKjhDyWldu6l0rB_lH-QYj5Zh7HF7iUCkaQ4gT_2z960MxxLZEplX0h7W-xutJXGlXNpHrB2QZ6ufBsectW7EnPx8iKyD52MFwA2',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e25) NetType/WIFI Language/zh_CN',
      'Referer': 'http://www.chn-hyd.com/XMTYZX/AppDZ/XMTYZX/VenueBill?VenueTypeID=' + VenueTypeID,
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.5;q=0.4',
      'Cookie': 'Abp.Localization.CultureName=zh-CN; HT.EmpID=dd20b3e0-b4f3-4795-a111-43ddb34bfe31; XSRF-TOKEN=keLHH2uc5FNew0FiqvrG30SPD_X_RRf4Dy-bvfSiYYOYXk0-T4_eCYW6xo_pmUPO1rgf9Ac-DMY2TEZZjboNgS0zRZYauvM9a0oQQ2NITlxbpyw_yfmgnRkOumIU1OjTi_CXtpMvcxIR8_0tFDyMmQ2; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.PartID=29ceadd7-c18d-47c6-ad54-859b5f6ee93e; HT.ShopDisplayName=%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97; HT.ShopID=d47c81fe-0624-4717-b051-53751641468f; HT.Weixin.AppID=wxa6382ec61ee0837f; HT.Weixin.OpenID=o4XV71ADaY4A3gaiOtlP_Qse2Ov4; __RequestVerificationToken_L1hNVFlaWA2=UPQZYo-mpaEmjxIIVZMrfWWbdh_uRxxf959HvKZSugYfk00eA6toY7Poh6X7cUZEJNS6UkzePVDLN-NBRbztupQYyuvn_G0DFSXWU47WSWw1; .AspNet.ApplicationCookie=OI18anfVe56OJH2fGqaFHwOjDPyA3aHT2nL3kTgYKrjq89CBRY9QPVcEGXgsyisnDv087LCpgugApaBlC-Kdeaa4qTLrV7CXc4T-HCLH0-o15LkJlx5gcetQ6UhT0BUbTupqUYpUkGI1HAv3pVmZw4B8FhamHg_Yez0EKVPyOqCZdY17FwCV5-v1HJRJmmUoDeony7hsTKD_SUb2HIiZEQH6UKZP8segzzKDakkSccGckJA_dlzC0MEkjEdio3LIVVB8nNoooyV6gO-Zt5_X0-5ZmQkE9lLRkkAFP4pFcorxZTeF6MLik4st2LsuVj5oeuYCcsUAwzcGSlH7yE_zJ0vBcay5dtwq3QjtNmytIajF1oyOi8aKre1sSbyYTzEdy_fRCa0JhY8lok2VfS3ZLj_vQF4KrBKF2sJS9FCok9QGmYYFhBajK6p7xbBGbV-vSlLeqXacK7lwqZ3VKpYPYP3uHWxMEgLtBUtJRyWrsOcIy0iyEZ7MP53QtfPUZ9Z7SSQxDjMltdX5Oy3yDy9DoA3IyM0lARGZPB8yoZF6JQb4wZQ_pl2d_GjcfmfITH2Ck_JkoEAwCHe3gr5-MZE8BxEQeA0h5c0kDMs50ILMiIK3qHhpcd-tScd0t2bG4y4V5irw4ThKfXEYTak9e9tL-gjszDT5fRo_IvFxBjmMZL8; ASP.NET_SessionId=ffxp14de1p3gw4astcw4c0gy; HT.App.Type=10; HT.Weixin.ServiceType=20; http://www.chn-ht.com/identity/claims/LoginType=20',
      'Connection': 'keep-alive',
      'Content-Length': 830,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status == 200) {
      console.log('二、预定场地成功√')
      payVenue(res.data.result.billRecordNo, VenueTypeID)
    }
  }).catch(err => {
    // console.log(err)
    console.log('二、预定场地失败×')
  });
}
// 付款
function payVenue(weixinBillRecordNo, VenueTypeID) {
  axios({
    url: 'http://www.chn-hyd.com/XMTYZX/api/services/app/XMVenueBill/VenueBillPayByEmpAsync',
    method: 'POST',
    data: {
      weixinBillRecordNo,
      empID: 'dd20b3e0-b4f3-4795-a111-43ddb34bfe31',
      walletID: 'cabc1bf1-6ee3-480c-89c0-c2d446e73f1a',
      webApiUniqueID: '6720c370-7961-d126-26b3-a56e51b8bae6'
    },
    headers: {
      'Host': 'www.chn-hyd.com',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Origin': 'http://www.chn-hyd.com',
      'X-XSRF-TOKEN': 'wQx0ZZHm_NNcmOmCEln4E4aWakOJe3A_wU0_PMJM_8YijNVucE5cKjhDyWldu6l0rB_lH-QYj5Zh7HF7iUCkaQ4gT_2z960MxxLZEplX0h7W-xutJXGlXNpHrB2QZ6ufBsectW7EnPx8iKyD52MFwA2',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e25) NetType/WIFI Language/zh_CN',
      'Referer': 'http://www.chn-hyd.com/XMTYZX/AppDZ/XMTYZX/VenueBill?VenueTypeID=' + VenueTypeID,
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.5;q=0.4',
      'Cookie': 'Abp.Localization.CultureName=zh-CN; HT.EmpID=dd20b3e0-b4f3-4795-a111-43ddb34bfe31; XSRF-TOKEN=keLHH2uc5FNew0FiqvrG30SPD_X_RRf4Dy-bvfSiYYOYXk0-T4_eCYW6xo_pmUPO1rgf9Ac-DMY2TEZZjboNgS0zRZYauvM9a0oQQ2NITlxbpyw_yfmgnRkOumIU1OjTi_CXtpMvcxIR8_0tFDyMmQ2; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.PartID=29ceadd7-c18d-47c6-ad54-859b5f6ee93e; HT.ShopDisplayName=%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97; HT.ShopID=d47c81fe-0624-4717-b051-53751641468f; HT.Weixin.AppID=wxa6382ec61ee0837f; HT.Weixin.OpenID=o4XV71ADaY4A3gaiOtlP_Qse2Ov4; __RequestVerificationToken_L1hNVFlaWA2=UPQZYo-mpaEmjxIIVZMrfWWbdh_uRxxf959HvKZSugYfk00eA6toY7Poh6X7cUZEJNS6UkzePVDLN-NBRbztupQYyuvn_G0DFSXWU47WSWw1; .AspNet.ApplicationCookie=OI18anfVe56OJH2fGqaFHwOjDPyA3aHT2nL3kTgYKrjq89CBRY9QPVcEGXgsyisnDv087LCpgugApaBlC-Kdeaa4qTLrV7CXc4T-HCLH0-o15LkJlx5gcetQ6UhT0BUbTupqUYpUkGI1HAv3pVmZw4B8FhamHg_Yez0EKVPyOqCZdY17FwCV5-v1HJRJmmUoDeony7hsTKD_SUb2HIiZEQH6UKZP8segzzKDakkSccGckJA_dlzC0MEkjEdio3LIVVB8nNoooyV6gO-Zt5_X0-5ZmQkE9lLRkkAFP4pFcorxZTeF6MLik4st2LsuVj5oeuYCcsUAwzcGSlH7yE_zJ0vBcay5dtwq3QjtNmytIajF1oyOi8aKre1sSbyYTzEdy_fRCa0JhY8lok2VfS3ZLj_vQF4KrBKF2sJS9FCok9QGmYYFhBajK6p7xbBGbV-vSlLeqXacK7lwqZ3VKpYPYP3uHWxMEgLtBUtJRyWrsOcIy0iyEZ7MP53QtfPUZ9Z7SSQxDjMltdX5Oy3yDy9DoA3IyM0lARGZPB8yoZF6JQb4wZQ_pl2d_GjcfmfITH2Ck_JkoEAwCHe3gr5-MZE8BxEQeA0h5c0kDMs50ILMiIK3qHhpcd-tScd0t2bG4y4V5irw4ThKfXEYTak9e9tL-gjszDT5fRo_IvFxBjmMZL8; ASP.NET_SessionId=ffxp14de1p3gw4astcw4c0gy; HT.App.Type=10; HT.Weixin.ServiceType=20; http://www.chn-ht.com/identity/claims/LoginType=20',
      'Connection': 'keep-alive',
      'Content-Length': 176,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status == 200) {
      console.log('三、支付成功√，请至微信确认')
      AVenueJob.stop()
      BVenueJob.stop()
    }
  }).catch(err => {
    console.log('三、支付失败×')
  });
}

module.exports = router;