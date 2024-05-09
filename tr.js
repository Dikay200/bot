const fs = require('fs');

function generateCIDRs(startCIDR, endCIDR) {
    const cidrs = [];
    const startIP = startCIDR.split('/')[0].split('.').map(Number);
    const endIP = endCIDR.split('/')[0].split('.').map(Number);
    const startMask = parseInt(startCIDR.split('/')[1]);

    for (let i = startIP[0]; i <= endIP[0]; i++) {
        for (let j = startIP[1]; j <= endIP[1]; j++) {
            for (let k = startIP[2]; k <= endIP[2]; k++) {
                for (let l = startIP[3]; l <= endIP[3]; l++) {
                    const cidr = ${i}.${j}.${k}.${l}/${startMask};
                    cidrs.push(cidr);
                }
            }
        }
    }
    return cidrs;
}


const startCIDR = '1.0.0.0/6';
const endCIDR = '255.0.0.255/32';
const cidrList = generateCIDRs(startCIDR, endCIDR);


fs.writeFileSync('tr.txt', cidrList.join("\n"));
console.log("done");