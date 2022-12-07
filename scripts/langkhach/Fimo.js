let obj = JSON.parse($response.body);
obj.subscribe = {
  "valid": true,
  "forever": 1,
  "endTime": null
};
$done({body: JSON.stringify(obj)})