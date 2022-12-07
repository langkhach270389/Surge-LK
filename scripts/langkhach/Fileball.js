let obj = JSON.parse($response.body);
obj["entries"]={
    "verify_receipt": "false",
    "reset_pro_if_transcation_id_missing": "false",
    "set_fake_pro_when_loading_offers_failed": "false",
    "verify_receipt_with_firebase": "false",
    "check_receipt_data": "false",
    "check_transcation_id_white_list": "",
    "enable_dandanplay": "true",
    "verify_product_identifier": "false",
    "clean_etag_when_loading_offsers_failed": "flase",
    "blacklist": "{\"list\":[]}",
    "detect_malformed": "false",
    "library_search_movie": "{\"enable\":true,\"source\":\"tmdb\"}",
    "enable_search_lyrics": "false"
    }
$done({body: JSON.stringify(obj)});