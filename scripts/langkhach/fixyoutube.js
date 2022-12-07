function removeUrlParameter(url,parameter){var urlParts=url.split('?');if(urlParts.length>=2){var urlBase=urlParts.shift();var queryString=urlParts.join('?');var prefix=encodeURIComponent(parameter)+'=';var parts=queryString.split(/[&;]/g);for(var i=parts.length;i-->0;){if(parts[i].lastIndexOf(prefix,0)!==-1){parts.splice(i,1);}}
url=urlBase+'?'+parts.join('&');}
return url;}

var url = $request.url;
if(url.indexOf("system_version") !=-1){
url = removeUrlParameter(url, "system_version");
url = removeUrlParameter(url, "app_version");
url = removeUrlParameter(url, "kdlc");
url = removeUrlParameter(url, "kss");
url = removeUrlParameter(url, "lib_ver");
url = removeUrlParameter(url, "device_model")
$done({ response: { status: 302, headers: { Location: url } } });
}else {
$done({})
}
