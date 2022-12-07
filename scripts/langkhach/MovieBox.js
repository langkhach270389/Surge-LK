let obj = JSON.parse($response.body);
if(obj?.data?.uid && obj?.data?.username &&obj?.data?.nickname){
obj.data.isvip=1;
obj.data.dead_time = 4100222993;
obj.data.add_time = 4100222993;
obj.data.invite_count = 1000;
$done({body: JSON.stringify(obj)});
}else{
$done({});
}
