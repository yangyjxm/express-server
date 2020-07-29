var express = require('express');
var router = express.Router();
const axios = require('axios');
const CronJob = require('cron').CronJob;

let Afinished = false

const listVenue = [{
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "1号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T21:57:22.53",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "4fc0451b-91d3-4c59-be0e-4555ff2c6216"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "2号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T21:57:29.257",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "756ce2d4-05bd-4ea6-aee0-657a3a93041e"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "3号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T21:57:42.57",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "59422b4a-8666-454e-989d-0d29a5e5926b"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "4号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:02:40.407",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "f4e201c6-2dbe-4530-97ac-111f9bf62b0e"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "5号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:02:54.347",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "712b3cc6-557d-41c5-b95d-c270723a4513"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "6号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:03:05.527",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "47fba415-5c33-4fd0-b703-c7c1501744a9"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "7号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:03:16.963",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "5a4b8d5f-ebc0-4303-b9a9-1f83c0214cf3"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "8号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:03:26.19",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "c9dec557-7618-4d5d-af79-9103d8b4a4bd"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "9号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:03:34.04",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "884aa629-87d0-4540-85c9-9cc0d3ae0629"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "10号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:03:44.097",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "8ed1efe3-bf52-4a8b-8cf3-806938662f18"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "11号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:03:49.69",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "4c95dab8-f07d-4bcd-9272-bc5eb2734c90"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "12号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:03:55.94",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "e393ad40-bca1-44e1-b730-ef2b875e569c"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "13号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:04:01.4",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "03d1399a-d268-48cd-8334-d276095286cf"
  },
  {
    "venueTypeID": "2e3fd9d7-9287-4c83-8d8c-b508c6813815",
    "venueTypeDisplayName": "综合馆羽毛球场A区",
    "isVirtual": false,
    "displayName": "14号场",
    "isActive": true,
    "noticeContentName": "xmty001",
    "creationTime": "2019-08-26T22:04:09.877",
    "creationUser": "admin[admin]",
    "lastModificationTime": null,
    "lastModificationUser": null,
    "remark": null,
    "id": "b959ab99-d529-4e5a-b909-bb0ad5b0db9d"
  }
]

router.get('', function (req, res, next) {
  res.render('index', {
    title: '【厦门市体育中心】公众号直接订场机器人'
  });
  let billDay = req.query.date
  let minute = req.query.minute
  // var AVenueJob = new CronJob('*/3 * * * * 5', function () {
  //   if (!Afinished) {
  queryVenueInfo(billDay, '2e3fd9d7-9287-4c83-8d8c-b508c6813815', minute)
  //   } else {
  //     AVenueJob.stop()
  //   }
  // }, null, true);
});

// 获取当前场地信息列表
function queryVenueInfo(billDay, minute) {
  for (let item of listVenue) {
    let data = {
      billDay,
      listData: [],
      webApiUniqueID: '6720c370-7961-d126-26b3-a56e51b8bae6'
    }
    for (let i = 0; i < minute / 30; i++) {
      data.listData.push({
        venueID: item.id,
        startTime: 14.5 * 60 + i * 30,
        endTime: 14.5 * 60 + 30 + i * 30,
        billValue: 32.5,
        realValue: 32.5
      })
    }
    // 预定场地
    orderVenue(data, item.venueTypeID)
  }
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
    } else {
      console.log('二、预定场地失败×')
    }
  }).catch(err => {
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
      Afinished = true
    } else {
      console.log('三、支付失败×')
    }
  }).catch(err => {
    // console.log('三、支付失败×')
  });
}

module.exports = router;