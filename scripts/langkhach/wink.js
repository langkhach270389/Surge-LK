let obj = {
  "code": 0,
  "message": "success",
  "data": {
    "active_sub_type": 1,
    "account_type": 1,
    "sub_type_name": "续期",
    "period_invalid_time": 4092624150000,
    "current_order_invalid_time": 4092624150000,
    "active_order_id": 6999666242529550661,
    "active_sub_type_name": "续期",
    "derive_type_name": "普通会员",
    "have_valid_contract": true,
    "derive_type": 1,
    "is_vip": true,
    "membership": {
      "id": 4,
      "display_name": "Wink会员",
      "level": 1,
      "level_name": "普通会员"
    },
    "sub_type": 2,
    "account_id": 1706882778,
    "invalid_time": 4092624150000,
    "valid_time": 4092624150000,
    "active_product_id": 0,
    "active_promotion_status": 2,
    "show_renew_flag": true
  },
  "request_id": "cf89f28557184d84b7649c6cf8310e86",
  "success": true,
  "error_code": "00000"
}
$done({body:JSON.stringify(obj)})