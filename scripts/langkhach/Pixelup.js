const obj = {
  "status": {
    "message": "Success",
    "code": 200
  },
  "payload": {
    "is_intro_offer": false,
    "latest_transaction_id": "20000487820566",
    "active": true,
    "is_renewal": false,
    "expires_at": 4099374586000,
    "auto_renew_status": "1",
    "grace_expires_at": null,
    "product_id": "pixelup.pro.yearly",
    "is_in_grace": false,
    "started_at": 1669460874000,
    "purchased_product_identifiers": [
      "pixelup.pro.yearly"
    ],
    "latest_transaction_time": 1669460873000,
    "subscription_id": "20001153604545",
    "is_trial": false,
    "is_family_share": false
  }
};
$done({response: {body: JSON.stringify(obj)}})