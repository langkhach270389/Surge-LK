var body = $response.body.replace(/"is_ios_licensed":false/g, '"is_ios_licensed":true');
$done({body});