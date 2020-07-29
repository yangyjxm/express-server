var express = require('express');
var router = express.Router();
const axios = require('axios');
const CronJob = require('cron').CronJob;

let Afinished = false
let Bfinished = false

router.get('/venueBot', function (req, res, next) {
  res.render('index', {
    title: '【厦门市体育中心】公众号抢场机器人'
  });
  let billDay = req.query.date
  let minute = req.query.minute
  var AVenueJob = new CronJob('*/3 * * * * 4', function () {
    if (!Afinished) {
      queryVenueInfo(billDay, '2e3fd9d7-9287-4c83-8d8c-b508c6813815', minute)
    } else {
      AVenueJob.stop()
    }
  }, null, true);
});

// 获取当前场地信息列表
function queryVenueInfo(billDay, VenueTypeID, minute) {
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
      'X-XSRF-TOKEN': 'uU6-HPJzoxujsid63dnC4K7IRVlp_EPCAJSnfXAQi3JBSXF-HbJJemYL5Cy8ixcF1ya13BelCv2J3LNDGaKrSP0Fuf2J_Zng2HlC49_zn93GZVKfgQidYJOeg-T_U3j6WM6vtlK_A4KPoXjJcSn9LA2',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e25) NetType/WIFI Language/zh_CN',
      'Referer': 'http://www.chn-hyd.com/XMTYZX/AppDZ/XMTYZX/VenueBill?VenueTypeID=' + VenueTypeID,
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN',
      'Cookie': 'Abp.Localization.CultureName=zh-CN; HT.EmpID=dd20b3e0-b4f3-4795-a111-43ddb34bfe31; XSRF-TOKEN=uU6-HPJzoxujsid63dnC4K7IRVlp_EPCAJSnfXAQi3JBSXF-HbJJemYL5Cy8ixcF1ya13BelCv2J3LNDGaKrSP0Fuf2J_Zng2HlC49_zn93GZVKfgQidYJOeg-T_U3j6WM6vtlK_A4KPoXjJcSn9LA2; HT.App.Type=10; HT.Weixin.ServiceType=20; http://www.chn-ht.com/identity/claims/LoginType=20; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.PartID=29ceadd7-c18d-47c6-ad54-859b5f6ee93e; HT.ShopDisplayName=%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97; HT.ShopID=d47c81fe-0624-4717-b051-53751641468f; HT.Weixin.AppID=wxa6382ec61ee0837f; HT.Weixin.OpenID=o4XV71ADaY4A3gaiOtlP_Qse2Ov4; __RequestVerificationToken_L1hNVFlaWA2=Dx1djyHyU9nZVnN232eyOZtmuyfOl-xh7U-exDZ2B8bkLLNd_ZLebkP9QChSqZgntjvwZ4sFevwd1FQapIp6FoltBRG3Mmwh_fFzNxggSgk1; .AspNet.ApplicationCookie=73S4AQ9Zg1gDtSjHptY7szCUpL-zvUWnCBnJRJPN65SAGcRShFViO3o0K4cn2gp5vE1EE6XdvP2BtiMCInrvr8iGX5byXwj6r_cWxMKu3_8K3h2YrPla1vu1u5v9B3A23vPcV9O786rLJxjazBZtKLQ5pDsNH7WSSqhtpltftjIz19ZZTiKznbu5OlcV7vH7AFo5uf-OIFZUSljkpJrLwmp5tcB_fL6wxR4J5bWMRVXrFCjHWWQjQTjimdC6hRQ68ld63xsQ0Pf32FsBnFiql3XCji_BH91WQkenLGxN9UcKqInnSSpCpu6bmurr6Tw-irvdIVc-u5c6_FrYSvsohuO9S5iE0_iz6joV9IGGq4Fi-0_Ty-184i4rfZ_bd-qjjVfFrWPlEOU8vWvrxNCNUwL7G2mD5H8NW_7mfPvJ5S2IHocmOBdQ687WeIMu7sXef42Ql6gyVuZfsg6pEYDD5Ejc5nPSFgUnmdMEyepuEtw0Ja6lK2_QJF4LIV1TH83aIrSbiRPoiyFfuU2agdgW2Qs7vvTs8-g2ryA_SZWDfRJD1jaIHu_CMSwTHQKoxhHkmnkidA1V7VOzkZpUzjMctWAgQOb2nRBbq4DUbDwPIP_zKTw_EBxc0JrrYd26yojwbFzs1D0ngWnFeUH_V0Z4M2SZSejylK9jSJC3kPpTIy0; ASP.NET_SessionId=y03mne2bp2vgghwptgzpq4gc',
      'Connection': 'keep-alive',
      'Content-Length': 181,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status == 200) {
      console.log('一、获取满足条件的场地列表成功√')
      let venueList = res.data.result[0].listWeixinVenueStatus // 获取到的数据列表
      let minutes = 0 // 可以玩的时间
      let okVenueList = [] // 可以玩的场次列表

      console.log((VenueTypeID === '2e3fd9d7-9287-4c83-8d8c-b508c6813815' ? 'A区' : 'B区') + '场地请求时间：' + new Date())

      // console.log('╔════════════════════════' + billDay + '大于90分钟的场地列表════════════════════════╗')
      // for (let index = 0; index < venueList.length - 1; index++) {
      //   minutes = (new Date(venueList[index + 1].startTime) - new Date(venueList[index].endTime)) / 60 / 1000
      //   if (minutes >= 90) {
      //     console.log('║场地ID：' + venueList[index].venueID + '，开始时间：' + venueList[index].endTime.substr(11, 5) + '，可以玩：' + minutes + '分钟║')
      //   }
      // }
      // console.log('╚══════════════════════════════════════════════════════════════════════════════╝')

      console.log('╔═════════════════════════' + billDay + '满足条件的场地列表═════════════════════════╗')
      for (let index = 0; index < venueList.length - 1; index++) {
        minutes = (new Date(venueList[index + 1].startTime) - new Date(venueList[index].endTime)) / 60 / 1000
        // 筛选能打minute分钟以上且为下午14:00——15:00开始的场地
        if (minutes >= minute && venueList[index].endTime.substr(11, 2) >= 14 && venueList[index].endTime.substr(11, 2) <= 15) {
          console.log('║场地ID：' + venueList[index].venueID + '，开始时间：' + venueList[index].endTime.substr(11, 5) + '，可以玩：' + minutes + '分钟║')
          okVenueList.push({
            ...venueList[index],
            minutes
          })
        }
      }
      console.log('╚══════════════════════════════════════════════════════════════════════════════╝')

      // 当A场没有符合条件的场地时，订B场
      if (VenueTypeID === '2e3fd9d7-9287-4c83-8d8c-b508c6813815' && !okVenueList.length) {
        Afinished = true
        var BVenueJob = new CronJob('*/3 * * * * 5', function () {
          if (!Bfinished) {
            queryVenueInfo(billDay, '08abed5d-6e76-4c7a-a1a2-aeaf38a38a0d', minute)
          } else {
            BVenueJob.stop()
          }
        }, null, true);
      }

      // 当B场没有符合条件的场地时，杀死进程
      if (VenueTypeID !== '2e3fd9d7-9287-4c83-8d8c-b508c6813815' && !okVenueList.length) {
        Bfinished = true
        console.log('已经没有任何符合要求的场地了，建议修改条件～')
      }
      let startTime = parseInt(okVenueList[0].endTime.substr(11, 2) * 60) + parseInt(okVenueList[0].endTime.substr(14, 2))
      let data = {
        billDay,
        listData: [],
        webApiUniqueID: '6720c370-7961-d126-26b3-a56e51b8bae6'
      } // 订场专用json
      for (let i = 0; i < minute / 30; i++) {
        data.listData.push({
          venueID: okVenueList[0].venueID,
          startTime: startTime + i * 30,
          endTime: startTime + 30 + i * 30,
          billValue: 32.5,
          realValue: 32.5
        })
      }
      // 预定场地
      orderVenue(data, VenueTypeID)
    } else {
      console.log('一、获取满足条件的场地列表失败×')
    }
  }).catch(err => {
    console.log(err)
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
      'X-XSRF-TOKEN': 'uU6-HPJzoxujsid63dnC4K7IRVlp_EPCAJSnfXAQi3JBSXF-HbJJemYL5Cy8ixcF1ya13BelCv2J3LNDGaKrSP0Fuf2J_Zng2HlC49_zn93GZVKfgQidYJOeg-T_U3j6WM6vtlK_A4KPoXjJcSn9LA2',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e25) NetType/WIFI Language/zh_CN',
      'Referer': 'http://www.chn-hyd.com/XMTYZX/AppDZ/XMTYZX/VenueBill?VenueTypeID=' + VenueTypeID,
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.5;q=0.4',
      'Cookie': 'Abp.Localization.CultureName=zh-CN; HT.EmpID=dd20b3e0-b4f3-4795-a111-43ddb34bfe31; XSRF-TOKEN=uU6-HPJzoxujsid63dnC4K7IRVlp_EPCAJSnfXAQi3JBSXF-HbJJemYL5Cy8ixcF1ya13BelCv2J3LNDGaKrSP0Fuf2J_Zng2HlC49_zn93GZVKfgQidYJOeg-T_U3j6WM6vtlK_A4KPoXjJcSn9LA2; HT.App.Type=10; HT.Weixin.ServiceType=20; http://www.chn-ht.com/identity/claims/LoginType=20; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.PartID=29ceadd7-c18d-47c6-ad54-859b5f6ee93e; HT.ShopDisplayName=%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97; HT.ShopID=d47c81fe-0624-4717-b051-53751641468f; HT.Weixin.AppID=wxa6382ec61ee0837f; HT.Weixin.OpenID=o4XV71ADaY4A3gaiOtlP_Qse2Ov4; __RequestVerificationToken_L1hNVFlaWA2=Dx1djyHyU9nZVnN232eyOZtmuyfOl-xh7U-exDZ2B8bkLLNd_ZLebkP9QChSqZgntjvwZ4sFevwd1FQapIp6FoltBRG3Mmwh_fFzNxggSgk1; .AspNet.ApplicationCookie=73S4AQ9Zg1gDtSjHptY7szCUpL-zvUWnCBnJRJPN65SAGcRShFViO3o0K4cn2gp5vE1EE6XdvP2BtiMCInrvr8iGX5byXwj6r_cWxMKu3_8K3h2YrPla1vu1u5v9B3A23vPcV9O786rLJxjazBZtKLQ5pDsNH7WSSqhtpltftjIz19ZZTiKznbu5OlcV7vH7AFo5uf-OIFZUSljkpJrLwmp5tcB_fL6wxR4J5bWMRVXrFCjHWWQjQTjimdC6hRQ68ld63xsQ0Pf32FsBnFiql3XCji_BH91WQkenLGxN9UcKqInnSSpCpu6bmurr6Tw-irvdIVc-u5c6_FrYSvsohuO9S5iE0_iz6joV9IGGq4Fi-0_Ty-184i4rfZ_bd-qjjVfFrWPlEOU8vWvrxNCNUwL7G2mD5H8NW_7mfPvJ5S2IHocmOBdQ687WeIMu7sXef42Ql6gyVuZfsg6pEYDD5Ejc5nPSFgUnmdMEyepuEtw0Ja6lK2_QJF4LIV1TH83aIrSbiRPoiyFfuU2agdgW2Qs7vvTs8-g2ryA_SZWDfRJD1jaIHu_CMSwTHQKoxhHkmnkidA1V7VOzkZpUzjMctWAgQOb2nRBbq4DUbDwPIP_zKTw_EBxc0JrrYd26yojwbFzs1D0ngWnFeUH_V0Z4M2SZSejylK9jSJC3kPpTIy0; ASP.NET_SessionId=y03mne2bp2vgghwptgzpq4gc',
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
    console.log(err)
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
      'X-XSRF-TOKEN': 'uU6-HPJzoxujsid63dnC4K7IRVlp_EPCAJSnfXAQi3JBSXF-HbJJemYL5Cy8ixcF1ya13BelCv2J3LNDGaKrSP0Fuf2J_Zng2HlC49_zn93GZVKfgQidYJOeg-T_U3j6WM6vtlK_A4KPoXjJcSn9LA2',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e25) NetType/WIFI Language/zh_CN',
      'Referer': 'http://www.chn-hyd.com/XMTYZX/AppDZ/XMTYZX/VenueBill?VenueTypeID=' + VenueTypeID,
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.5;q=0.4',
      'Cookie': 'Abp.Localization.CultureName=zh-CN; HT.EmpID=dd20b3e0-b4f3-4795-a111-43ddb34bfe31; XSRF-TOKEN=uU6-HPJzoxujsid63dnC4K7IRVlp_EPCAJSnfXAQi3JBSXF-HbJJemYL5Cy8ixcF1ya13BelCv2J3LNDGaKrSP0Fuf2J_Zng2HlC49_zn93GZVKfgQidYJOeg-T_U3j6WM6vtlK_A4KPoXjJcSn9LA2; HT.App.Type=10; HT.Weixin.ServiceType=20; http://www.chn-ht.com/identity/claims/LoginType=20; HT.PartDisplayName=%e9%bb%98%e8%ae%a4%e5%88%86%e9%83%a8; HT.PartID=29ceadd7-c18d-47c6-ad54-859b5f6ee93e; HT.ShopDisplayName=%e5%be%ae%e4%bf%a1%e5%88%86%e5%ba%97; HT.ShopID=d47c81fe-0624-4717-b051-53751641468f; HT.Weixin.AppID=wxa6382ec61ee0837f; HT.Weixin.OpenID=o4XV71ADaY4A3gaiOtlP_Qse2Ov4; __RequestVerificationToken_L1hNVFlaWA2=Dx1djyHyU9nZVnN232eyOZtmuyfOl-xh7U-exDZ2B8bkLLNd_ZLebkP9QChSqZgntjvwZ4sFevwd1FQapIp6FoltBRG3Mmwh_fFzNxggSgk1; .AspNet.ApplicationCookie=73S4AQ9Zg1gDtSjHptY7szCUpL-zvUWnCBnJRJPN65SAGcRShFViO3o0K4cn2gp5vE1EE6XdvP2BtiMCInrvr8iGX5byXwj6r_cWxMKu3_8K3h2YrPla1vu1u5v9B3A23vPcV9O786rLJxjazBZtKLQ5pDsNH7WSSqhtpltftjIz19ZZTiKznbu5OlcV7vH7AFo5uf-OIFZUSljkpJrLwmp5tcB_fL6wxR4J5bWMRVXrFCjHWWQjQTjimdC6hRQ68ld63xsQ0Pf32FsBnFiql3XCji_BH91WQkenLGxN9UcKqInnSSpCpu6bmurr6Tw-irvdIVc-u5c6_FrYSvsohuO9S5iE0_iz6joV9IGGq4Fi-0_Ty-184i4rfZ_bd-qjjVfFrWPlEOU8vWvrxNCNUwL7G2mD5H8NW_7mfPvJ5S2IHocmOBdQ687WeIMu7sXef42Ql6gyVuZfsg6pEYDD5Ejc5nPSFgUnmdMEyepuEtw0Ja6lK2_QJF4LIV1TH83aIrSbiRPoiyFfuU2agdgW2Qs7vvTs8-g2ryA_SZWDfRJD1jaIHu_CMSwTHQKoxhHkmnkidA1V7VOzkZpUzjMctWAgQOb2nRBbq4DUbDwPIP_zKTw_EBxc0JrrYd26yojwbFzs1D0ngWnFeUH_V0Z4M2SZSejylK9jSJC3kPpTIy0; ASP.NET_SessionId=y03mne2bp2vgghwptgzpq4gc',
      'Connection': 'keep-alive',
      'Content-Length': 176,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status == 200) {
      console.log('三、支付成功√，请至微信确认')
      Afinished = true
      Bfinished = true
    } else {
      console.log('三、支付失败×')
    }
  }).catch(err => {
    // console.log('三、支付失败×')
  });
}

module.exports = router;