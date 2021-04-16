/*
@langkhach
AutoNextDNS - HomeDNS
Surge TF 4.11.0 build 1910
*/
const sgmodule = "NextDNS-Utra-Low";
const path = "v1/modules";

getModuleStatus(sgmodule).then(main);

function main(enable) {
  console.log(getModuleStatus(sgmodule));
  let home = $network.wifi.ssid == "Tầng 3" || $network.wifi.ssid == "VNPT";
  if (home && enable) {
    //At home, it will enable nextDNS => close
    $notification.post("Close NextDNS ", "", "");
    enableModule(false);
  } else if (!home && !enable) {
    //Not at home, but didn't enable nextdns =>
    $notification.post("Enable NextDNS ", "", "");
    enableModule(true);
  } else {
    //Repeat trigger => End
    //$notification.post("Repeat trigger ","","")
    $done();
  }
}

function getModuleStatus(sgmodule) {
  return new Promise(resolve => {
    $httpAPI("GET", path, null, resp => {
      let enabled = resp.enabled;
      resolve(enabled.includes(sgmodule));
    });
  });
}

function enableModule(enable) {
  var body = {};
  body[sgmodule] = enable;
  $httpAPI("POST", path, body, () => $done());
}
