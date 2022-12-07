/**
 * https://dl.dropboxusercontent.com/s/ka1hjf1zvmwmqqq/craft_ka1hjf1zvmwmqqq.js?dl=0
 * Craft = type=http-response,pattern=^https://api\.craft\.do/auth/v\d/profile$,requires-body=1,max-size=0,script-path=./Scripts/craft_ka1hjf1zvmwmqqq.js,debug=1
 * https://api.craft.do/auth/v2/profile
 */


var homie = JSON.parse($response.body)

homie.subscription = {
    "tier": "Pro",
    "subscriptionActive": true,
    "expirationDate": 2993403857352,
    "subscriptionType": "license",
    "rawSubscriptionType": "License_BackToSchool2022",
    "productId": "53-week"
}

homie.limits = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im1heE51bWJlck9mU3BhY2VzIjoxMDAsImRlZmF1bHRTcGFjZUxpbWl0cyI6eyJtYXhTdWJCbG9ja3NJbkJsb2NrIjoyMDAwLCJtYXhEb2N1bWVudHNJblNwYWNlIjoxMDAwLCJtYXhCbG9ja3NJblNwYWNlIjoxMDAwMDAsIm1heE1lbWJlcnNJblNwYWNlIjoyMCwibWF4Q29udGVudExlbmd0aE9mQmxvY2siOjEwMDAwLCJtYXhDb250ZW50TGVuZ3RoT2ZTbmlwcGV0IjoxMDAwMCwibWF4Q29weUFtb3VudCI6MTAwMDAsIm1heEZvbGRlcnNJblNwYWNlIjoxMDAsIm1heExlbmd0aE9mQ29tbWVudCI6MjAwMCwibWF4Q29tbWVudHNJblNwYWNlIjoxMDAwMCwibWF4RmlsZVNpemUiOjI1NiwibWF4QXR0YWNobWVudHNJblNwYWNlIjoxMDAwMCwibWF4TnVtYmVyT2ZEYXlzSW5BY3Rpdml0eUhpc3RvcnkiOjMwLCJhbGxvd0V4cG9ydCI6dHJ1ZSwibWF4U3RvcmFnZVNpemVGb3JTcGFjZSI6MTAyNDB9fSwic3BhY2VzIjpbXSwidGVhbXMiOltdLCJpYXQiOjE2NjUxMTgyMjV9.AEb-Y_1sQKcXZopaI6pA45FLJ0fB_aHBnX_xA2A59E5Nlypa-Ini9XYHnu0K_ws7Hg_gjXLwIBAsDlduq-Hmr8_npvLOwhqQib5B1xeo5GU0PE6QcfOQBdZigbBiEOjpN3l3fLiNSjuzOGw6yi3sETEk-ov6l1RAtkRurCRRxgEDIgfytDAwi_OMb2JmBZYaDm1PxZB66EiigFw4FRQwbYmJ7xDxbOnQV36wGGythDmiB2bjURX0cZGOwTlW1yGnKu6KA2NAsBuFj1kzPgUj9QxEAxpHbkatVrNSfUsyyCAASCOW7l9ba9mdWUyciVgDxm-tDwc1mEmOfLLAzGWJKg"

$done({ body: JSON.stringify(homie) })