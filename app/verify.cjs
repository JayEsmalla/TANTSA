const fs = require('fs');
const c = fs.readFileSync('dist/app.js', 'utf8');

const checks = [
  ['No ILLUSTRATIVE DEMO pill', !c.includes('ILLUSTRATIVE DEMO')],
  ['No workflowStepper in render()', !c.slice(c.lastIndexOf('function render'), c.lastIndexOf('function render')+3000).includes('workflowStepper()')],
  ['scenarioBar only 2 places (def+today)', (c.match(/scenarioBar/g)||[]).length === 2],
  ['No 4th stat Kasalukuyang benta', !c.includes('Kasalukuyang benta')],
  ['Stat label Ginawa', c.includes("stat('Ginawa'")],
  ['Stat label Nabenta', c.includes("stat('Nabenta'")],
  ['Stat label Natira', c.includes("stat('Natira'")],
  ['Table headers lowercase', c.includes('<th>Produkto</th>')],
  ['No marketing banner', !c.includes('<div class="banner">')],
  ['plan-note removed', !c.includes('class="plan-note"')],
  ['Eyebrow shortened to Para bukas', c.includes('Para bukas')],
  ['Stats 3-col on today', c.includes('repeat(3,1fr)')],
  ['History in details accordion', c.includes('<details')],
];

let passed = 0;
checks.forEach(([name, result]) => {
  const mark = result ? 'PASS' : 'FAIL';
  if (result) passed++;
  console.log(mark, '-', name);
});
console.log('\n' + passed + '/' + checks.length + ' checks passed');
