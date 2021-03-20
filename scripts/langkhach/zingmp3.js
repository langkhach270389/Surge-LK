let obj= JSON.parse($response.body);


delete obj.data.lastVipExpireTime;
obj.data.vip= {
  "expireTime": 1892800999000,
  "startTime": 1572527803000,
  "subscription": {
    "status": 0,
    "expireTime": 1892800999000,
    "platform": 1
  },
  "vipType": 1
}

$done({body:JSON.stringify(obj)});
