const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// Check what the actual stats div start looks like in today()
const statIdx = c.indexOf('class="stat ');
const statCtx = c.slice(statIdx-80, statIdx+20);
console.log('stats context:', JSON.stringify(statCtx));

// Also check the stats div opener
const statsIdx = c.indexOf('"stats"');
let idx=0, locs=[];
while((idx=c.indexOf('"stats"',idx))!==-1){
  locs.push(idx);
  console.log('stats div at', idx, ':', JSON.stringify(c.slice(idx-20, idx+50)));
  idx++;
}
