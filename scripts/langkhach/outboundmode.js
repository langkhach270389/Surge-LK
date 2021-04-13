//event network-changed script-path=network-changed.js
//version: 2.2
//auther: tempoblink

//The Notification Format.
let TITLE = 'Outbound Changed!';
let SUBTITLE_CELLULAR = 'Cellular: ';
let SUBTITLE_WIFI = 'Wi-Fi: ';
let ABOUT_MODE = 'Outbound mode: ';
let ABOUT_IP = 'New IP address: ';
let VIETTEL = "VIETTEL";
let VINAPHONE = "VINAPHONE";
let MOBIFONE = "MOBIFONE";


//white ssid and black ssid.
let ALLOWLIST = [
            "home_ssid1",
            "home_ssid2"
    ];
let BLOCKLIST = [
            "free_ssid1",
            "free_ssid2"
    ];

//The default outbound: 'Direct' or 'Rule' or 'Global-proxy'.
let BlockList = "Direct";
let AllowList = "Rule";
let Others = "Rule";
let Cellular = "Rule";

function changeOutboundMode(mode) {
    ABOUT_IP += $network.v4.primaryAddress;
    if($surge.setOutboundMode(mode.toLowerCase()))
        $notification.post(TITLE, NETWORK, ABOUT_MODE + mode + '\n' + ABOUT_IP);
}

//wifi select outbound
let NETWORK = "";
if ($network.v4.primaryInterface == "en0") {
    NETWORK += SUBTITLE_WIFI + $network.wifi.ssid;
    if (BLOCKLIST.indexOf($network.wifi.ssid) != -1) {
        changeOutboundMode(BlockList);
    } else if (ALLOWLIST.indexOf($network.wifi.ssid) != -1) {
        changeOutboundMode(AllowList);
    } else {
        changeOutboundMode(Others);
    }
}else if($network.v4.primaryInterface == "pdp_ip0") {
    let CARRIER = $network['cellular-data'].carrier;  
    if(CARRIER == "452-01") SUBTITLE_CELLULAR += MOBIFONE;
    else if(CARRIER == "452-02") SUBTITLE_CELLULAR += VINAPHONE;
    else if(CARRIER == "452-04") SUBTITLE_CELLULAR += VIETTEL;
    NETWORK += SUBTITLE_CELLULAR + " " + $network['cellular-data'].radio;
    changeOutboundMode(Cellular);
}

$done();
