const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// The actual raw bytes at position 3724 show literal chars:
// '))}' then '<div class="stats">' then '${stat('Ginawa'...'
// The quotes around stats are actual double-quote chars (0x22)
// Let's do the replacement using the actual characters

const OLD = '<div class="stats">${stat(\'Ginawa\'';
const NEW = '<div class="stats" style="grid-template-columns:repeat(3,1fr)">${stat(\'Ginawa\'';

const i = c.indexOf(OLD);
console.log('found OLD at:', i);

if(i !== -1) {
  c = c.slice(0,i) + NEW + c.slice(i+OLD.length);
  console.log('replacement done');
}

console.log('3-col present:', c.includes('repeat(3,1fr)'));
fs.writeFileSync('dist/app.js', c);
console.log('Done');
