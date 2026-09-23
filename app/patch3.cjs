const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// Add 3-column inline style to the today() stats div (the first one at ~3735)
const OLD = '}<div class=\\"stats\\"><div class=\\"stat ';
const NEW = '}<div class=\\"stats\\" style=\\"grid-template-columns:repeat(3,1fr)\\"><div class=\\"stat ';

// Only replace the first occurrence (in today())
const i = c.indexOf(OLD);
if (i !== -1) {
  c = c.slice(0, i) + NEW + c.slice(i + OLD.length);
  console.log('stats 3-col added at index', i);
} else {
  // Try different quote style
  const OLD2 = '<div class=\\"stats\\"><div class=\\"stat ';
  const ALL = [...c.matchAll(/<div class=\\"stats\\"><div class=\\"stat /g)];
  console.log('All matches:', ALL.map(m=>m.index));
}

console.log('3-col present:', c.includes('repeat(3,1fr)'));

fs.writeFileSync('dist/app.js', c);
console.log('Done');
