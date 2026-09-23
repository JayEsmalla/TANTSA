const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// 1. Fix eyebrow: "TANTSA PARA BUKAS &nbsp; ↗" -> "Para bukas"
// The &nbsp; is stored as unicode in the JS template literal
c = c.replace('TANTSA PARA BUKAS \u00a0 \u2197', 'Para bukas');
// Also try with &nbsp; entity
c = c.replace('TANTSA PARA BUKAS &amp;nbsp; \u2197', 'Para bukas');
// Also try with literal &nbsp;
c = c.replace('TANTSA PARA BUKAS &nbsp; \u2197', 'Para bukas');
console.log('1. eyebrow fixed:', !c.includes('TANTSA PARA BUKAS'));

// 2. Change stats div in today() to 3-col layout via inline style
// Find the stats div right after the heading in today() and add inline style
c = c.replace(
  '<div class=\\"stats\\"><div class=\\"stat ',
  '<div class=\\"stats\\" style=\\"grid-template-columns:repeat(3,1fr)\\"><div class=\\"stat '
);
console.log('2. stats 3-col inline style added:', c.includes('repeat(3,1fr)'));

// 3. Shorten today() heading eyebrow text
c = c.replace("heading('THURSDAY, SEPTEMBER 24 · DEMO DAY'", "heading('Ngayon'");
console.log('3. heading eyebrow shortened:', c.includes("heading('Ngayon'"));

// 4. Shorten today() heading subtitle
c = c.replace(
  "'A little clarity for today. A better start for tomorrow.'",
  "'Isang malinaw na simula para bukas.'"
);
console.log('4. heading subtitle shortened:', c.includes('malinaw na simula'));

fs.writeFileSync('dist/app.js', c);
console.log('\n✓ Done');
