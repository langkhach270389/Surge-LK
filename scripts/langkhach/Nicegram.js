const obj = {
  "data": {
    "premiumAccess": true
  }
};
$done({status:200,headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)});
