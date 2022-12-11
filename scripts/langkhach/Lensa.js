let obj = JSON.parse($response.body);
obj.is_valid = true;
obj.expiration_date = "2099-01-01T00:00:00Z";
obj.expiration_date_unix = 4070967919;
obj.subscription_type = "active";
$done({body: JSON.stringify(obj)});