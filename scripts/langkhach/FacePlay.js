const url = $request.url;
const info = "info";
const account = "account";
var obj = JSON.parse($response.body)
if(url.indexOf(info) != -1){
obj.data.account.isVip = 1;
obj.data.account.balance = 69696969;
obj.data.account.freezeBalance = 69696969;
obj.data.account.vipExpired = 4092610661000
}
if(url.indexOf(account) != -1){
obj.data.isVip = 1;
obj.data.balance = 69696969;
obj.data.freezeBalance = 69696969;
obj.data.vipExpired = 4092610661000
}
$done({body: JSON.stringify(obj)})