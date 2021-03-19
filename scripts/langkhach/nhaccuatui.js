let obj = JSON.parse($response.body);
let url = $request.url;
const user = "users/info";
if(url.indexOf(user) != -1)
{
obj.data.VIPExpire= "09/09/9999 00:00:00";
obj.data.isVIP= true;
}
$done({body: JSON.stringify(obj)});
