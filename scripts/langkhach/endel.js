var obj = JSON.parse($response.body);

obj["subscription"]= {
    "time_left" : 0,
    "trial_type" : "CALENDAR_BASED",
    "price_id" : "",
    "period" : "NOPERIOD",
    "cancel_at_period_end" : false,
    "valid_until" : 1873089612.367564,
    "type" : "ACTIVE",
    "store" : "NOSTORE"
    };

$done({body: JSON.stringify(obj)});
