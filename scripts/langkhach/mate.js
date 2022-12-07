let obj = JSON.parse($response.body);
obj = {
  "isLifetime": true,
  "isSubscriptionVerified": false,
  "hasBoughtPaidApp": true
}
$done({body: JSON.stringify(obj)});