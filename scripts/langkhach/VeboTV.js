let obj = {
  "status": 1,
  "data": {
    "detail": true,
    "profile_url": "https://api.fbdata.xyz/web/profile",
    "app": {
      "can_skip_update": true,
      "app_url": "https://vebotv.app/",
      "contact": "unlocked noads",
      "share_content": "Xem bóng đá",
      "version": 1,
      "notice_update": false,
      "share_url": "https://vebotv.app/"
    },
    "forgot_url": "https://api.fbdata.xyz/web/profile/forgot",
    "float_icons": [

    ],
    "highlights": true
  }
}

$done({response: {body: JSON.stringify(obj)}});