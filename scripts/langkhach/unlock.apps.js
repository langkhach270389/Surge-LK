re('"expires_date":"\\w{4}@"period_type":"\\w+"', '"expires_date":"2099@"period_type":"active"');
function re(){const verbose=true;var header=$response.header;var body=$response.body;if(arguments[0].includes("@")){var regs=arguments[0].split("@");var strs=arguments[1].split("@");for(i=0;i<regs.length;i++){var reg=new RegExp(regs[i],"g");body=body.replace(reg,strs[i]);}}
else{var reg=new RegExp(arguments[0],"g");body=body.replace(reg,arguments[1]);};

if(verbose){
console.log(`\n🟢OLD: \n ${$response.body}\n🟠NEW: \n${body}`);
}
 $done({body});
} 