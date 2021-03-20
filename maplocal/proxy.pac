function FindProxyForURL(url, host){
var P=“PROXY “;
var PROXY_DIRECT=“PROXY localhost:6152”;
var u=url.toLowerCase();
var h=host.toLowerCase();
var BLACK=“PROXY localhost:8080”;
var WHITE=PROXY_DIRECT;
var r;

function id(ar){for(var i=0;i<ar.length;i++){if(dnsDomainIs(h,ar[i]))return i}return null}
function ids(ar){for(var i=0;i<ar.length;i++){if(shExpMatch(u,”*://“+ar[i]+”/*”))return i}return null}
function is(ar){for(var i=0;i<ar.length;i++){if(shExpMatch(u,ar[i]))return i}return null}
function ii(ar,ar2){for(var i=0;i<ar.length;i++){if(isInNet(h,ar[i][0],ar2[ar[i][1]]))return i}return null}
function n(arg){return arg!=null}

var WHITE_DOMAINS=[];
var WHITE_SUBDOMAINS=[];
var WHITE_URLS=[];
var WHITE_NETWORKS=[];
var WHITE_MASKS=[];

if(n(r=id(WHITE_DOMAINS))){return WHITE}
if(n(r=ids(WHITE_SUBDOMAINS))){return WHITE}
if(n(r=is(WHITE_URLS))){return WHITE}
if(n(r=ii(WHITE_NETWORKS,WHITE_MASKS))){return WHITE}

var BLACK_DOMAINS=[“onesignal.com”,”discovery.api.zaloapp.com”,”shop.zaloapp.com”,”googlesyndication.com”,”mesu.apple.com”,”google-analytics.com”,”doubleclick.net”,”settings.crashlytics.com”,”ssl.google-analytics.com”,”chartboost.com”,”zalo-ads.zadn.vn”,”stc.za.zaloapp.com”,”connect.facebook.net”,”ad-brix.com”,”impact.applifier.com”,”adcolony.com”,”mavq.net”,”kaymopk.com”,”www.cvsuqfsul.com”,”c2.popads.net”,”is-gateway.supersonicads.com”,”adtilt.com”,”rv-gateway.supersonicads.com”,”www.statcounter.com”,”supersonicads-a.akamaihd.net”,”startappservice.com”,”ms.applvn.com”,”log.baomoi.com”,”appsflyer.com”,”outcome-ssp.supersonicads.com”,”cf.iadsdk.apple.com”,”log.adtimaserver.vn”,”adtima-media.zadn.vn”,”api.adtimaserver.vn”,”init.supersonicads.com”,”ng-vn-notice.gameitop.com”,”e.crashlytics.com”,”smaato.net”,”ailamtrieuphu.com”,”track.clickhubs.com”,”trk.superads.cn”,”x.appbaqend.com”,”a.appbaqend.com”,”logger.adthor.com”,”pokkt.fuse-ad.com”,”logger.zcoup.com”,”api.adthor.com”,”ocsp.apple.com”,”tok.leadloss.com”,”ads.aerserv.com”,”ads.mopub.com”,”cdn.appnext.com”,”data.flurry.com”,”net.rayjump.com”,”analytics.rayjump.com”,”ads.api.vungle.com”,”z.moatads.com”,”setting.rayjump.com”,”proton.flurry.com”,”api.zcoup.com”,”ads.flurry.com”,”gum.criteo.com”,”www.vungle.com”,”ios.bugly.qq.com”,”ulogs.umeng.com”,”sec.umeng.com”,”twpejojsim.com”,”api.leanplum.com”,”static.eclick.vn”,”log.eclick.vn”,”g.eclick.vn”,”s.eclick.vn”,”apinas.nct.vn”,”app.adjust.com”,”googleadservices.com”,”log4x.nixcdn.com”,”stc-nas.nixcdn.com”,”mvas.mobifone.vn”,”dangky.mobifone.vn”,”mpay.nct.vn”,”sb.scorecardresearch.com”,”vta.nixcdn.com”,”bs.serving-sys.com”,”lrc.nct.nixcdn.com”,”adtrack1.midasplayer.com”,”p.midasplayer.com”,”servicelayer.king.com”,”cdn-akamai.unityads.unity3d.com”,”auction.unityads.unity3d.com”,”publisher-config.unityads.unity3d.com”,”tracking.prd.mz.internal.unity3d.com”,”config.unityads.unity3d.com”,”webview.unityads.unity3d.com”,”jianchiapp.com”,”d.adsplay.net”,”www.googletagservices.com”,”contenido1.midasplayer.com”,”ws.tapjoyads.com”,”rpc.tapjoy.com”,”placements.tapjoy.com”,”content.tapjoy.com”,”connect.tapjoy.com”,”adservice.google.com”,”api.appodeal.com”,”d.applovin.com”,”rt.applovin.com”,”a.applovin.com”,”rt.applvn.com”,”d.applvn.com”,”a.applvn.com”,”cdn.bootcss.com”,”api.app1vn.com”,”org.zaloapp.ads.zdn.vn”,”zalo-ads-td.zadn.vn”,”ad.360in.com”,”reports.crashlytics.com”,”ms.applovin.com”,”gstaticadssl.l.google.com”,”xp.apple.com”,”4hag.adj.st”,”ads.google.com”,”gameeve.beacon.qq.com”,”gamestr.beacon.qq.com”,”cdp.cloud.unity3d.com”,”bugly.qq.com”,”tvnotice.kg.garena.vn”,”serve.popads.net”,”platform-cdn.sharethis.com”,”count-server.sharethis.com”,”l.sharethis.com”,”c.adsco.re”,”c1.popads.net”,”buttons-config.sharethis.com”,”googletagmanager.com”,”platform-api.sharethis.com”,”ad.a-ads.com”,”c.statcounter.com”,”cheap-ads.net”];
var BLACK_SUBDOMAINS=[];
var BLACK_URLS=[“http://*.admicro.vn/*”,”http://*.cheap-ads.net/*”];
var BLACK_NETWORKS=[];
var BLACK_MASKS=[];

if(n(r=id(BLACK_DOMAINS))){return BLACK}
if(n(r=ids(BLACK_SUBDOMAINS))){return BLACK}
if(n(r=is(BLACK_URLS))){return BLACK}
if(n(r=ii(BLACK_NETWORKS,BLACK_MASKS))){return BLACK}

var IN_DOMAINS=[];
var OUT_DOMAINS=[];
var IN_SUBDOMAINS=[];
var OUT_SUBDOMAINS=[];
var IN_URLS=[];
var OUT_URLS=[];
var IN_NET=[];
var IN_MASK=[];
var OUT_NET=[];

if(n(r=id(IN_DOMAINS))){return P+OUT_DOMAINS[r]}
if(n(r=ids(IN_SUBDOMAINS))){return P+OUT_SUBDOMAINS[r]}
if(n(r=is(IN_URLS))){return P+OUT_URLS[r]}
if(n(r=ii(IN_NET,IN_MASK))){return P+OUT_NET[r]}

return PROXY_DIRECT;
}
