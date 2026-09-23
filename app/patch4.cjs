const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// The stats div in the file looks like: class=\"stats\">${stat(
// in raw file it uses unicode escapes
const target = 'class=\\"stats\\">' + "${stat('Ginawa'";
const replacement = 'class=\\"stats\\" style=\\"grid-template-columns:repeat(3,1fr)\\">' + "${stat('Ginawa'";

const i = c.indexOf(target);
console.log('found at', i);
if (i !== -1) {
  c = c.slice(0, i) + replacement + c.slice(i + target.length);
}

console.log('3-col present:', c.includes('repeat(3,1fr)'));
fs.writeFileSync('dist/app.js', c);
console.log('Done');
