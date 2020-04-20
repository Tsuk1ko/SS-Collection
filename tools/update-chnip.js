const Netmask = require('netmask').Netmask;
const { get } = require('axios');
const { writeFileSync } = require('fs');

const CHNIP_FILE = '../SSR/chn_ip.txt';

get('https://raw.githubusercontent.com/17mon/china_ip_list/master/china_ip_list.txt').then(({ data }) => {
    const CIDRs = data.split(/\s/);
    const ranges = CIDRs.map(CIDR => {
        const { base, broadcast, first, last } = new Netmask(CIDR);
        return `${base || first} ${broadcast || last}`;
    });
    writeFileSync(CHNIP_FILE, ranges.join('\n'));
});
