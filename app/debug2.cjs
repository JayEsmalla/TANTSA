const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// Print raw bytes around position 3730-3800 to see exact encoding
const slice = c.slice(3720, 3810);
console.log('raw slice:');
for(let i=0;i<slice.length;i++){
  process.stdout.write(slice.charCodeAt(i).toString(16).padStart(4,'0')+' ');
}
console.log();
console.log('as string:', JSON.stringify(slice));
