const { Netmask } = require('netmask');
const { get } = require('axios').default;
const { writeFileSync } = require('fs');
const { resolve } = require('path');

const CHNIP_URL = 'https://raw.githubusercontent.com/17mon/china_ip_list/master/china_ip_list.txt';
const CHNIP_FILE = resolve(__dirname, '../SSR/chn_ip.txt');

get(CHNIP_URL).then(({ data }) => {
  const cidrs = data.split(/\s+/).filter(Boolean);
  const ranges = cidrs.map(cidr => {
    const { base, broadcast, first, last } = new Netmask(cidr);
    return `${base || first} ${broadcast || last}`;
  });
  writeFileSync(CHNIP_FILE, ranges.join('\n'));
});
