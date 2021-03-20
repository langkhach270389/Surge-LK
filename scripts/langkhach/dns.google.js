$httpClient.get('https://dns.google/resolve?name='+$domain,function(error,response,data){if(error){$done({address:'0.0.0.0'});}else{let answer=JSON.parse(data).Answer
var A_record=answer.filter(item=>item.type==1)
$done({addresses:Array.from(A_record,x=>x["data"])});}});