let obj= JSON.parse($response.body);

if($response.body.indexOf("lastVipExpireTime") !=-1){
delete obj.data.lastVipExpireTime;
}
obj.data.vip= {
  "expireTime": 4096412384000,
  "startTime": 1572527803000,
  "subscription": {
    "status": 0,
    "expireTime": 4096412384000,
    "platform": 5
  },
  "vipType": 1
}

$done({body:JSON.stringify(obj)});
