/*
README:https://github.com/VirgilClyne/Cloudflare
*/

const $ = new Env("1.1.1.1 by Cloudflare v1.3.1-panel");
const DataBase = {
	"1dot1dot1dot1": {
		"Settings": {"Switch":true,"setupMode":"ChangeKeypair","Verify":{"RegistrationId":null,"Mode":"Token","Content":null}},
		"Configs": {"Request":{"url":"https://api.cloudflareclient.com","headers":{"authorization":null,"content-Type":"application/json","user-Agent":"1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0","cf-client-version":"i-6.7-2109031904.1"}}}
	},
	"VPN": {
		"Settings":{"Switch":true,"PrivateKey":"","PublicKey":""},
		"Configs":{"interface":{"addresses":{"v4":"","v6":""}},"peers":[{"public_key":"","endpoint":{"host":"","v4":"","v6":""}}]}
	},
	"DNS": {
		"Settings":{"Switch":true,"Verify":{"Mode":"Token","Content":""},"zone":{"id":"","name":"","dns_records":[{"id":"","type":"A","name":"","content":"","ttl":1,"proxied":false}]}},
		"Configs":{"Request":{"url":"https://api.cloudflare.com/client/v4","headers":{"content-type":"application/json"}}}
	},
	"WARP": {
		"Settings":{"Switch":true,"setupMode":null,"deviceType":"iOS","Verify":{"License":null,"Mode":"Token","Content":null,"RegistrationId":null}},
		"Configs":{"Request":{"url":"https://api.cloudflareclient.com","headers":{"authorization":null,"content-type":"application/json","user-agent":"1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0","cf-client-version":"i-6.7-2109031904.1"}},"Environment":{"iOS":{"Type":"i","Version":"v0i2109031904","headers":{"user-agent":"1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0","cf-client-version":"i-6.7-2109031904.1"}},"macOS":{"Type":"m","Version":"v0i2109031904","headers":{"user-agent":"1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0","cf-client-version":"m-2021.12.1.0-0"}},"Android":{"Type":"a","Version":"v0a1922","headers":{"user-agent":"okhttp/3.12.1","cf-client-version":"a-6.3-1922"}},"Windows":{"Type":"w","Version":"","headers":{"user-agent":"","cf-client-version":""}},"Linux":{"Type":"l","Version":"","headers":{"user-agent":"","cf-client-version":""}}}}
	}
};

/***************** Processing *****************/
(async () => {
	const { Settings, Caches, Configs } = await setENV("Cloudflare", "1dot1dot1dot1", DataBase);
	const [Trace4, Trace6] = await Promise.allSettled([Cloudflare("trace4"), Cloudflare("trace6")]).then(results => results.map(result => formatTrace(result.value)));
	let Account = {};
	if (Caches?.url && Caches?.headers) {
		const Request = {
			"url": Caches?.url,
			"headers": {
				...Caches?.headers ?? {},
				"x-surge-skip-scripting": "true"
			}
		};
		Account = await Cloudflare("GET", Request).then(result => formatAccount(result?.account ?? {}));
	};
	let content = {}
	switch ($environment.language) {
		case "zh-Hans":
		case "zh-Hant":
			content = `公用IPv4: ${Trace4?.ip}\n公用IPv6: ${Trace6?.ip}\n主机托管中心: ${Trace4?.loc ?? Trace6?.loc} | ${Trace4?.colo ?? Trace6?.colo}\nWARP隐私: ${Trace4?.warp ?? Trace6?.warp}\n账户类型: ${Account?.data?.type ?? "获取失败"}\n流量信息: ${Account?.data?.text ?? "获取失败"}`
			break;
		case "en":
		case "en-US":
		default:
			content = `Public IPv4: ${Trace4?.ip}\nPublic IPv6: ${Trace6?.ip}\nColocation Center: ${Trace4?.loc ?? Trace6?.loc} | ${Trace4?.colo ?? Trace6?.colo}\nWARP Level: ${Trace4?.warp ?? Trace6?.warp}\nAccount Type: ${Account?.data?.type ?? "Failed to get"}\nData Information: ${Account?.data?.text ?? "Failed to get"}`
			break;
	};
	const Panel = {
		"title": "☁ CloudFlare WARP",
		//"icon": "lock.icloud.fill",
		"content": content,
	};
    $done(Panel);
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())

/***************** Function *****************/
/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default Database
 * @return {Promise<*>}
 */
async function getENV(t,e,n){let i=$.getjson(t,n),s={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((t=>t.split("="))));for(let e in t)f(s,e,t[e])}let g={...n?.Default?.Settings,...n?.[e]?.Settings,...i?.[e]?.Settings,...s},o={...n?.Default?.Configs,...n?.[e]?.Configs,...i?.[e]?.Configs},a=i?.[e]?.Caches||void 0;return"string"==typeof a&&(a=JSON.parse(a)),{Settings:g,Caches:a,Configs:o};function f(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} platform - Platform Name
 * @param {Object} database - Default DataBase
 * @return {Promise<*>}
 */
async function setENV(name, platform, database) {
	//$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	let { Settings, Caches = {}, Configs } = await getENV(name, platform, database);
	/***************** Prase *****************/
	Settings.Switch = JSON.parse(Settings.Switch) // BoxJs字符串转Boolean
	switch (Settings.Verify.Mode) {
		case "Token":
			Configs.Request.headers["authorization"] = `Bearer ${Settings.Verify.Content}`;
			break;
		case "ServiceKey":
			Configs.Request.headers["x-auth-user-service-key"] = Settings.Verify.Content;
			break;
		case "Key":
			Settings.Verify.Content = Array.from(Settings.Verify.Content.split("\n"))
			//$.log(JSON.stringify(Settings.Verify.Content))
			Configs.Request.headers["x-auth-key"] = Settings.Verify.Content[0];
			Configs.Request.headers["x-auth-email"] = Settings.Verify.Content[1];
			break;
		default:
			//$.log("No available authorization methods", `Mode=${Settings.Verify.Mode}`, `Content=${Settings.Verify.Content}`);
			break;
	};
	//$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `SettingsContent: ${JSON.stringify(Settings)}`, "");
	return { Settings, Caches, Configs }
};

function formatTrace(trace) {
	switch (trace?.warp) {
		case "off":
			trace.warp += " | No protection";
			break;
		case "on":
			trace.warp += " | Partial protection";
			break;
		case "plus":
			trace.warp += " | Complete protection";
			break;
		case undefined:
			break;
		default:
			trace.warp += " | Unknown type";
			break;
	};
	return trace;
};

function formatAccount(account) {
	switch (account.account_type) {
		case "unlimited":
			account.data = {
				"type": "Unlimited version | unlimited",
				"limited": false,
			}
			break;
		case "limited":
			account.data = {
				"type": "Limited edition | limited",
				"limited": true,
				"used": parseInt(account.premium_data - account.quota) / 1024 / 1024 / 1024,
				"flow": parseInt(account.quota) / 1024 / 1024 / 1024,
				"total": parseInt(account.premium_data) / 1024 / 1024 / 1024
			}
			break;
		case "team":
			account.data = {
				"type": "Team version | team",
				"limited": false,
			}
			break;
		case "plus":
			account.data = {
				"type": "WARP+ | plus",
				"limited": false,
			}
			break;
		case "free":
			account.data = {
				"type": "Free version | free",
				"limited": true,
				"used": parseInt(account.premium_data - account.quota) / 1024 / 1024 / 1024,
				"flow": parseInt(account.quota) / 1024 / 1024 / 1024,
				"total": parseInt(account.premium_data) / 1024 / 1024 / 1024
			}
			break;
		default:
			account.data = {
				"type": account?.account_type,
				"limited": undefined
			}
			break;
	};
	switch (account.data.limited) {
		case true:
			switch ($environment.language) {
				case "zh-Hans":
				case "zh-Hant":
					account.data.text = `\n已用流量: ${account.data.used.toFixed(2)}GB\n剩余流量: ${account.data.flow.toFixed(2)}GB\n总计流量: ${account.data.total.toFixed(2)}GB`
					break;
				case "en":
				case "en-US":
				default:
					account.data.text = `\nUsed: ${account.data.used.toFixed(2)}GB\nResidual: ${account.data.flow.toFixed(2)}GB\nTotal: ${account.data.total.toFixed(2)}GB`
					break;
			};
			break;
		case false:
			account.data.text = "Unrestricted | unlimited"
			break;
		default:
			account.data.text = "Unknown | unknown"
			break;
	}
	return account;
};
async function Cloudflare(opt, Request = DataBase.WARP.Configs.Request, Environment = DataBase.WARP.Configs.Environment, Settings = DataBase.WARP.Settings ) {
	/*
	let Request = {
		// Endpoints
		"url": "https://api.cloudflareclient.com",
		"headers": {
			"Host": "api.cloudflareclient.com",
			"content-type": "application/json",
			"user-agent": "1.1.1.1/2109031904.1 CFNetwork/1327.0.4 Darwin/21.2.0",
			"cf-client-version": "i-6.7-2109031904.1"
		}
	};
	*/
	let _Request = JSON.parse(JSON.stringify(Request));
	switch (opt) {
		case "trace":
			_Request.url = "https://cloudflare.com/cdn-cgi/trace";
			delete _Request.headers;
			return await formatCFJSON(_Request);
		case "trace4":
			_Request.url = "https://1.1.1.1/cdn-cgi/trace";
			delete _Request.headers;
			return await formatCFJSON(_Request);
		case "trace6":
			_Request.url = "https://[2606:4700:4700::1111]/cdn-cgi/trace";
			delete _Request.headers;
			return await formatCFJSON(_Request);
		case "GET":
			// GET Cloudflare JSON
			//$.log(JSON.stringify(_Request));
			return await getCFjson(_Request);
		case "FATCH":
			// FATCH Cloudflare JSON
			$.log('FATCH');
			//$.log(JSON.stringify(_Request));
			return await fatchCFjson(_Request);
	};

	/***************** Function *****************/
	// Format Cloudflare JSON
	async function formatCFJSON(request) {
		return await $.http.get(request).then(response => {
			let arr = response.body.trim().split('\n').map(e => e.split('='))
			return Object.fromEntries(arr)
		})
	};
	// Function 0A
	// Get Cloudflare JSON
	function getCFjson(request) {
		return new Promise((resolve) => {
			$.get(request, (error, response, data) => {
				try {
					if (error) throw new Error(error)
					else if (data) {
						const _data = JSON.parse(data)
						if (Array.isArray(_data.messages)) _data.messages.forEach(message => {
							if (message.code !== 10000) $.msg($.name, `code: ${message.code}`, `message: ${message.message}`);
						})
						switch (_data.success) {
							case true:
								resolve(_data?.result?.[0] ?? _data?.result); // _data.result, _data.meta
								break;
							case false:
								if (Array.isArray(_data.errors)) _data.errors.forEach(error => { $.msg($.name, `code: ${error.code}`, `message: ${error.message}`); })
								break;
							case undefined:
								resolve(response);
						};
					} else throw new Error(response);
				} catch (e) {
					$.logErr(`❗️${$.name}, ${getCFjson.name}Failure to execute`, `request = ${JSON.stringify(request)}`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, "")
				} finally {
					//$.log(`🚧 ${$.name}, ${getCFjson.name}调试信息`, `request = ${JSON.stringify(request)}`, `data = ${data}`, "")
					resolve()
				}
			})
		})
	};

	// Function 0B
	// Fatch Cloudflare JSON
	function fatchCFjson(request) {
		return new Promise((resolve) => {
			$.post(request, (error, response, data) => {
				try {
					if (error) throw new Error(error)
					else if (data) {
						const _data = JSON.parse(data)
						if (Array.isArray(_data.messages)) _data.messages.forEach(message => {
							if (message.code !== 10000) $.msg($.name, `code: ${message.code}`, `message: ${message.message}`);
						})
						switch (_data.success) {
							case true:
								resolve(_data?.result?.[0] ?? _data?.result); // _data.result, _data.meta
								break;
							case false:
								if (Array.isArray(_data.errors)) _data.errors.forEach(error => { $.msg($.name, `code: ${error.code}`, `message: ${error.message}`); })
								break;
							case undefined:
								resolve(response);
						};
					} else throw new Error(response);
				} catch (e) {
					$.logErr(`❗️${$.name}, ${fatchCFjson.name}执行失败`, `request = ${JSON.stringify(request)}`, ` error = ${error || e}`, `response = ${JSON.stringify(response)}`, `data = ${data}`, "")
				} finally {
					//$.log(`🚧 ${$.name}, ${fatchCFjson.name}调试信息`, `request = ${JSON.stringify(request)}`, `data = ${data}`, "")
					resolve()
				}
			})
		})
	};

}
/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(name, opts) {
  class Http {
    constructor(env) {
      this.env = env
    }

    send(opts, method = 'GET') {
      opts = typeof opts === 'string' ? { url: opts } : opts
      let sender = this.get
      if (method === 'POST') {
        sender = this.post
      }
      return new Promise((resolve, reject) => {
        sender.call(this, opts, (err, resp, body) => {
          if (err) reject(err)
          else resolve(resp)
        })
      })
    }

    get(opts) {
      return this.send.call(this.env, opts)
    }

    post(opts) {
      return this.send.call(this.env, opts, 'POST')
    }
  }

  return new (class {
    constructor(name, opts) {
      this.name = name
      this.http = new Http(this)
      this.data = null
      this.dataFile = 'box.dat'
      this.logs = []
      this.isMute = false
      this.isNeedRewrite = false
      this.logSeparator = '\n'
      this.encoding = 'utf-8'
      this.startTime = new Date().getTime()
      Object.assign(this, opts)
      //this.log('', `🔔${this.name}, Begin!`)
    }

    isNode() {
      return 'undefined' !== typeof module && !!module.exports
    }

    isQuanX() {
      return 'undefined' !== typeof $task
    }

    isSurge() {
      return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
    }

    isLoon() {
      return 'undefined' !== typeof $loon
    }

    isShadowrocket() {
      return 'undefined' !== typeof $rocket
    }

    isStash() {
      return 'undefined' !== typeof $environment && $environment['stash-version']
    }

    toObj(str, defaultValue = null) {
      try {
        return JSON.parse(str)
      } catch {
        return defaultValue
      }
    }

    toStr(obj, defaultValue = null) {
      try {
        return JSON.stringify(obj)
      } catch {
        return defaultValue
      }
    }

    getjson(key, defaultValue) {
      let json = defaultValue
      const val = this.getdata(key)
      if (val) {
        try {
          json = JSON.parse(this.getdata(key))
        } catch {}
      }
      return json
    }

    setjson(val, key) {
      try {
        return this.setdata(JSON.stringify(val), key)
      } catch {
        return false
      }
    }

    getScript(url) {
      return new Promise((resolve) => {
        this.get({ url }, (err, resp, body) => resolve(body))
      })
    }

    runScript(script, runOpts) {
      return new Promise((resolve) => {
        let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
        httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
        let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
        httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
        httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
        const [key, addr] = httpapi.split('@')
        const opts = {
          url: `http://${addr}/v1/scripting/evaluate`,
          body: { script_text: script, mock_type: 'cron', timeout: httpapi_timeout },
          headers: { 'X-Key': key, 'Accept': '*/*' }
        }
        this.post(opts, (err, resp, body) => resolve(body))
      }).catch((e) => this.logErr(e))
    }

    loaddata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
          try {
            return JSON.parse(this.fs.readFileSync(datPath))
          } catch (e) {
            return {}
          }
        } else return {}
      } else return {}
    }

    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        const jsondata = JSON.stringify(this.data)
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsondata)
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        }
      }
    }

    lodash_get(source, path, defaultValue = undefined) {
      const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
      let result = source
      for (const p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
          return defaultValue
        }
      }
      return result
    }

    lodash_set(obj, path, value) {
      if (Object(obj) !== obj) return obj
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
      path
        .slice(0, -1)
        .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
        path[path.length - 1]
      ] = value
      return obj
    }

    getdata(key) {
      let val = this.getval(key)
      // If it is @
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objval = objkey ? this.getval(objkey) : ''
        if (objval) {
          try {
            const objedval = JSON.parse(objval)
            val = objedval ? this.lodash_get(objedval, paths, '') : val
          } catch (e) {
            val = ''
          }
        }
      }
      return val
    }

    setdata(val, key) {
      let issuc = false
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objdat = this.getval(objkey)
        const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
        try {
          const objedval = JSON.parse(objval)
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        } catch (e) {
          const objedval = {}
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        }
      } else {
        issuc = this.setval(val, key)
      }
      return issuc
    }

    getval(key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(key)
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        return this.data[key]
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    setval(val, key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(val, key)
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(val, key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        this.data[key] = val
        this.writedata()
        return true
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    initGotEnv(opts) {
      this.got = this.got ? this.got : require('got')
      this.cktough = this.cktough ? this.cktough : require('tough-cookie')
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
      if (opts) {
        opts.headers = opts.headers ? opts.headers : {}
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
          opts.cookieJar = this.ckjar
        }
      }
    }

    get(opts, callback = () => {}) {
      if (opts.headers) {
        delete opts.headers['Content-Type']
        delete opts.headers['Content-Length']
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, { 'X-Surge-Skip-Scripting': false })
        }
        $httpClient.get(opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, { hints: false })
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        let iconv = require('iconv-lite')
        this.initGotEnv(opts)
        this.got(opts)
          .on('redirect', (resp, nextOpts) => {
            try {
              if (resp.headers['set-cookie']) {
                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                if (ck) {
                  this.ckjar.setCookieSync(ck, null)
                }
                nextOpts.cookieJar = this.ckjar
              }
            } catch (e) {
              this.logErr(e)
            }
            // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
          })
          .then(
            (resp) => {
              const { statusCode: status, statusCode, headers, rawBody } = resp
              callback(null, { status, statusCode, headers, rawBody }, iconv.decode(rawBody, this.encoding))
            },
            (err) => {
              const { message: error, response: resp } = err
              callback(error, resp, resp && iconv.decode(resp.rawBody, this.encoding))
            }
          )
      }
    }

    post(opts, callback = () => {}) {
      const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
      // If you specify it, please request it, but specify `Content-Type`, It will be automatically generated.
      if (opts.body && opts.headers && !opts.headers['Content-Type']) {
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
      if (opts.headers) delete opts.headers['Content-Length']
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, { 'X-Surge-Skip-Scripting': false })
        }
        $httpClient[method](opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        opts.method = method
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, { hints: false })
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        let iconv = require('iconv-lite')
        this.initGotEnv(opts)
        const { url, ..._opts } = opts
        this.got[method](url, _opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, rawBody } = resp
            callback(null, { status, statusCode, headers, rawBody }, iconv.decode(rawBody, this.encoding))
          },
          (err) => {
            const { message: error, response: resp } = err
            callback(error, resp, resp && iconv.decode(resp.rawBody, this.encoding))
          }
        )
      }
    }
    /**
     *
     * Example::$.time('yyyy-MM-dd qq HH:mm:ss.S')
     *    :$.time('yyyyMMddHHmmssS')
     *    y:Year M: month d: day q: season H: time m: minutes s: seconds S:Milliseconds

* Among them, y selected 0-4th place divination mark, S available 0-1th place occupancy code, extra available 0-2th place occupancy code
     * @param {string} fmt Formatting parameters
     * @param {number} Optional: Return the formatting date according to the specified timestamp
     *
     */
    time(fmt, ts = null) {
      const date = ts ? new Date(ts) : new Date()
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      return fmt
    }

    /**
     * System notification
     *
     * > Notification parameters: QuanX and Loon formats are supported at the same time. EnvJs automatically converts according to the running environment, and the Surge environment does not support multimedia notifications.
     *
     * Example::
     * $.msg(title, subt, desc, 'twitter://')
     * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     *
     * @param {*} title Heading
     * @param {*} subt Subheading
     * @param {*} desc Notification details
     * @param {*} opts Notification parameters
     *
     */
    msg(title = name, subt = '', desc = '', opts) {
      const toEnvOpts = (rawopts) => {
        if (!rawopts) return rawopts
        if (typeof rawopts === 'string') {
          if (this.isLoon()) return rawopts
          else if (this.isQuanX()) return { 'open-url': rawopts }
          else if (this.isSurge()) return { url: rawopts }
          else return undefined
        } else if (typeof rawopts === 'object') {
          if (this.isLoon()) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
            let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
            return { openUrl, mediaUrl }
          } else if (this.isQuanX()) {
            let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
            let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
            let updatePasteboard = rawopts['update-pasteboard'] || rawopts.updatePasteboard
            return { 'open-url': openUrl, 'media-url': mediaUrl, 'update-pasteboard': updatePasteboard }
          } else if (this.isSurge()) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
            return { url: openUrl }
          }
        } else {
          return undefined
        }
      }
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(title, subt, desc, toEnvOpts(opts))
        } else if (this.isQuanX()) {
          $notify(title, subt, desc, toEnvOpts(opts))
        }
      }
      if (!this.isMuteLog) {
        let logs = ['', '========📣System notification📣========']
        logs.push(title)
        subt ? logs.push(subt) : ''
        desc ? logs.push(desc) : ''
        console.log(logs.join('\n'))
        this.logs = this.logs.concat(logs)
      }
    }

    log(...logs) {
      if (logs.length > 0) {
        this.logs = [...this.logs, ...logs]
      }
      console.log(logs.join(this.logSeparator))
    }

    logErr(err, msg) {
      const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
      if (!isPrintSack) {
        this.log('', `❗️${this.name}, Wrong!`, err)
      } else {
        this.log('', `❗️${this.name}, Wrong!`, err.stack)
      }
    }

    wait(time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    done(val = {}) {
      const endTime = new Date().getTime()
      const costTime = (endTime - this.startTime) / 1000
      //this.log('', `🔔${this.name}, End! 🕛 ${costTime} Seconds`)
      this.log()
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(val)
      }
    }
  })(name, opts)
}
