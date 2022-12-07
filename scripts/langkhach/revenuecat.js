const resp = {};
const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const list = {
	'VSCO': { name: 'membership', id: 'com.circles.fin.premium.yearly' },
	'1Blocker': { name: 'premium', id: 'blocker.ios.subscription.yearly' },
	'Anybox': { name: 'pro', id: 'cc.anybox.Anybox.annual' },
	'Fileball': { name: 'filebox_pro', id: 'com.premium.yearly' },
	'ipTV': { name: 'ipTV +', id: 'iptv_9.99_1y_7d_free' },
		'Speechify': { name: 'pro', id: 'com.cliffweitzman.speechifyMobile2.premium.annual' }
};
const data = {
	"expires_date": "2099-02-18T07:52:54Z",
	"original_purchase_date": "2020-02-11T07:52:55Z",
	"purchase_date": "2020-02-11T07:52:54Z"
};

if (typeof $response == "undefined") {
	delete $request.headers["x-revenuecat-etag"]; // prevent 304 issues
	delete $request.headers["X-RevenueCat-ETag"];
	resp.headers = $request.headers;
} else if (obj && obj.subscriber) {
	obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
	obj.subscriber.entitlement = obj.subscriber.entitlement || {};
	for (const i in list) {
		if (new RegExp(`^${i}`, `i`).test(ua)) {
			obj.subscriber.subscriptions[list[i].id] = data;
			obj.subscriber.entitlements[list[i].name] = JSON.parse(JSON.stringify(data));
			obj.subscriber.entitlements[list[i].name].product_identifier = list[i].id;
			break;
		}
	}
	resp.body = JSON.stringify(obj).replace(/\"expires_date\":\"\w{4}/g, "\"expires_date\":\"2099").replace(/\"period_type\":\"\w+\"/g, "\"period_type\":\"active\"");
}
$done(resp);
