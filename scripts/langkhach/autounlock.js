/**
 * Script auto unlock 
 */

// Whether to turn on the output 
const verbose = true;
const url = $request.url;
let body = $response.body;
const re = /re(\(.+\))/;
if (body.match(re) == null){
    // skip
if (verbose) {
          console.log("Skiped unlock");
      }
    $done({body});
} 
else {
    if (verbose) {
        console.log(`Start autounlock scripts ： ${url}...`);
      }
      const autounlock = `function re() {
var body = $response.body;
 if (arguments[0].includes("@")) {
  var regs = arguments[0].split("@");
  var strs = arguments[1].split("@");
  for (i = 0;i < regs.length;i++) {
   var reg = new RegExp(regs[i],"g");
   body = body.replace(reg, strs[i]);
 }
}
 else {
  var reg = new RegExp(arguments[0],"g");
  body = body.replace(reg, arguments[1]);
}
 $done({body});
}`;
let header = `${body.match(re)[0]} \n\n ${autounlock}`;
      const converted = body.replace(re, header);
      
      $done({body: converted});
      if (verbose) {
          console.log("Successful unlock");
      }
}
