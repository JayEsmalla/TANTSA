const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// ── 1. Remove "Naka-save sa device" + "ILLUSTRATIVE DEMO" pill from topbar ──
c = c.replace(/<span>Naka-save sa device<\/span><span class="pill sample">ILLUSTRATIVE DEMO<\/span>/, '');
console.log('1. topbar stripped:', !c.includes('Naka-save sa device'));

// ── 2. Remove workflowStepper() + global scenarioBar() from render() ──
// The exact sequence in the minified render string:
c = c.replace(/\$\{state\.view!=='today'\?workflowStepper\(\):''\}\$\{scenarioBar\(\)\}/, '');
console.log('2. stepper+scenarioBar removed from render:', !c.includes('workflowStepper()') && !c.includes('${scenarioBar()}'));

// ── 3. Simplify today() function ──

// 3a. Remove the 4th stat (Kasalukuyang benta)
c = c.replace(/\$\{stat\('Kasalukuyang benta',money\(sum\(state\.products\.map\(\(p,i\)=>p\.price\*t\.sold\[i\]\)\)\),'bago ibawas ang sangkap',false,'₱'\)\}/, '');
console.log('3a. 4th stat removed:', !c.includes('Kasalukuyang benta'));

// 3b. Rename stat labels (remove parenthetical translations)
c = c.replace("stat('Ginawa ngayon (Prepared)'", "stat('Ginawa'");
c = c.replace("stat('Nabenta (Sold)'", "stat('Nabenta'");
c = c.replace("stat('Tira sa counter (Leftover)'", "stat('Natira'");
console.log('3b. Stat labels cleaned:', !c.includes('(Prepared)'));

// 3c. Change stats grid to 3 columns when only 3 stats are shown on today page
// We'll do this via inline style instead

// 3d. Change table headers in the today counter table to simpler labels
c = c.replace('<th>PRODUCT</th><th>GINAWA</th><th>NABENTA</th><th>TIRA (LEFT)</th>', '<th>Produkto</th><th>Ginawa</th><th>Nabenta</th><th>Natira</th>');
console.log('3d. Table headers cleaned:', c.includes('<th>Produkto</th>'));

// 3e. Remove marketing banner from today()
c = c.replace(/<div class="banner">.*?<\/div><\/div>/, '');
// More targeted - find the banner section
const bannerStart = c.indexOf('<div class=\\"banner\\"');
if(bannerStart === -1) {
  // Try without escaping
  const idx = c.indexOf('<div class="banner"');
  if(idx !== -1) {
    const bannerEnd = c.indexOf('</div>', c.indexOf('</img>', idx));
    // Find the closing of the banner div
    let depth = 0, i = idx;
    while(i < c.length) {
      if(c.slice(i,i+4) === '<div') depth++;
      if(c.slice(i,i+6) === '</div') { depth--; if(depth===0){ i+=6; break; } }
      i++;
    }
    c = c.slice(0, idx) + c.slice(i);
    console.log('3e. Banner removed');
  }
}

// 3f. Remove plan-note from today plan card
c = c.replace(/<p class="plan-note">Desisyon mo pa rin ang masusunod\.<\/p>/, '');
console.log('3f. plan-note removed:', !c.includes('plan-note'));

// 3g. Shorten eyebrow in plan card from "TANTSA PARA BUKAS &nbsp; ↗" to "Para bukas"
c = c.replace('TANTSA PARA BUKAS &amp;nbsp; ↗', 'Para bukas');
console.log('3g. eyebrow shortened:', !c.includes('TANTSA PARA BUKAS'));

// 3h. Wrap history chart card in a details accordion
// Find the history card section and wrap it
c = c.replace(
  '<section class="card"><div class="card-head"><div><h2>Kasaysayan ng Benta (History)</h2>',
  '<details class="card" style="border:1px solid var(--line);border-radius:13px;box-shadow:var(--shadow);overflow:hidden"><summary style="padding:16px 20px;cursor:pointer;font-weight:600;font-size:14px;color:var(--green);list-style:none">Kasaysayan ng Benta <span style="color:var(--muted);font-weight:400;font-size:12px">· ipakita</span></summary><div class="card-head" style="display:none"><div><h2>Kasaysayan ng Benta</h2>'
);
// Close the section tag appropriately — find it and replace with </details>
// Actually simpler: just replace the closing </section> that follows the chart
// We need to find this specific section end
const histIdx = c.indexOf('Aktwal na walk-ins');
if(histIdx !== -1) {
  const sectionClose = c.indexOf('</section>', histIdx);
  if(sectionClose !== -1) {
    c = c.slice(0, sectionClose) + '</details>' + c.slice(sectionClose + 10);
    console.log('3h. History chart in accordion');
  }
}

// 4. Add scenarioBar() back inside today() function at the top
// Find start of today() output and prepend the scenario bar
c = c.replace(
  "function today(){const t=state.today,p=plan(state),remaining=sum(t.prepared)-sum(t.sold)-sum(t.discarded);return `",
  "function today(){const t=state.today,p=plan(state),remaining=sum(t.prepared)-sum(t.sold)-sum(t.discarded);return `${scenarioBar()}"
);
console.log('4. scenarioBar added to today():', c.includes("return `\${scenarioBar()}"));

fs.writeFileSync('dist/app.js', c);
console.log('\n✓ All patches applied');
