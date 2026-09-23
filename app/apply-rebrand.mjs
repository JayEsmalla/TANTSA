import fs from 'node:fs';

// ── 1. Update index.html ──
let html = fs.readFileSync('dist/index.html', 'utf8');
html = html.replace(/<title>.*?<\/title>/, '<title>Tantify · Guess Less. Make Right. Earn More.</title>');
html = html.replace(/content="A working, illustrative daily preparation planner for small prepared-food businesses\."/, 'content="Tantify · Daily preparation planner for small prepared-food businesses."');
html = html.replace(/href="logo\.png"/, 'href="logo1.png?v=3"');
html = html.replace(/href="styles\.css"/, 'href="styles.css?v=3"');
html = html.replace(/src="app\.js"/, 'src="app.js?v=3"');
fs.writeFileSync('dist/index.html', html);
console.log('✓ index.html updated');

// ── 2. Update styles.css ──
let css = fs.readFileSync('dist/styles.css', 'utf8');

// Update brand-logo styling for Tantify wordmark
css = css.replace(
  /\.brand-logo\{width:40px;height:40px;border-radius:9px;background:#ffffff;object-fit:contain;padding:2px;box-shadow:0 3px 8px rgba\(0,0,0,0\.22\);flex-shrink:0\}/,
  '.brand-logo{height:38px;width:auto;max-width:160px;border-radius:9px;background:#ffffff;object-fit:contain;padding:4px 12px;box-shadow:0 3px 8px rgba(0,0,0,0.22);flex-shrink:0}'
);

// Mobile brand-logo styling
css = css.replace(
  /\.mobile-brand \.brand-logo\{width:32px;height:32px;border-radius:7px;padding:2px\}/,
  '.mobile-brand .brand-logo{height:32px;width:auto;max-width:130px;border-radius:7px;background:#ffffff;padding:3px 8px;object-fit:contain}'
);

// Completely hide stepper-bar if any lingering markup exists
css = css.replace(
  /\.stepper-bar\{display:flex;gap:6px;background:#fff;border:1px solid var\(--line\);border-radius:12px;padding:8px 12px;margin-bottom:20px;overflow-x:auto;-webkit-overflow-scrolling:touch;box-shadow:var\(--shadow\)\}/,
  '.stepper-bar{display:none!important}'
);

fs.writeFileSync('dist/styles.css', css);
console.log('✓ styles.css updated');

// ── 3. Update app.js ──
let js = fs.readFileSync('dist/app.js', 'utf8');

// Update storage KEY and fallback hydration
js = js.replace("const KEY='tantsa-demo-v1';", "const KEY='tantify-demo-v1';");
js = js.replace(
  "localStorage.getItem(KEY)||localStorage.getItem('saktoserve-demo-v1')",
  "localStorage.getItem(KEY)||localStorage.getItem('tantsa-demo-v1')||localStorage.getItem('saktoserve-demo-v1')"
);

// Remove workflowStepper function completely
const wsStart = js.indexOf('function workflowStepper(){');
if (wsStart !== -1) {
  const wsEnd = js.indexOf('function scenarioBar()', wsStart);
  if (wsEnd !== -1) {
    js = js.slice(0, wsStart) + js.slice(wsEnd);
    console.log('✓ workflowStepper function removed completely');
  }
}

// Brand markup in sidebar: use clean Tantify logo badge
js = js.replace(
  '<div class="brand" data-action="nav:today" role="button" tabindex="0"><img src="logo.png" alt="TANTSA Logo" class="brand-logo"><div>TANT<span>SA</span></div></div>',
  '<div class="brand" data-action="nav:today" role="button" tabindex="0"><img src="logo1.png?v=3" alt="Tantify Logo" class="brand-logo"></div>'
);

// Brand markup in mobile header
js = js.replace(
  '<div class="brand mobile-brand" data-action="nav:today" role="button" tabindex="0"><img src="logo.png" alt="TANTSA Logo" class="brand-logo"><div>TANT<span>SA</span></div></div>',
  '<div class="brand mobile-brand" data-action="nav:today" role="button" tabindex="0"><img src="logo1.png?v=3" alt="Tantify Logo" class="brand-logo"></div>'
);

// Any remaining logo.png references
js = js.replaceAll('src="logo.png"', 'src="logo1.png?v=3"');
js = js.replaceAll('alt="TANTSA Logo"', 'alt="Tantify Logo"');

// Rebrand text references
js = js.replace('<span>Tantsa</span>', '<span>Tantify</span>');
js = js.replace('Tantsa para bukas', 'Tantify para bukas');
js = js.replaceAll('tantsa ni Tantsa', 'tantsa ni Tantify');
js = js.replaceAll('plano ni Tantsa', 'plano ni Tantify');
js = js.replaceAll('Mungkahi ni Tantsa', 'Mungkahi ni Tantify');
js = js.replaceAll('mungkahi ni Tantsa', 'mungkahi ni Tantify');
js = js.replaceAll('si Tantsa', 'si Tantify');
js = js.replaceAll('ni Tantsa', 'ni Tantify');

fs.writeFileSync('dist/app.js', js);
console.log('✓ app.js updated');

// ── 4. Update server.mjs ──
let server = fs.readFileSync('server.mjs', 'utf8');
server = server.replace('TANTSA: http://127.0.0.1:4173', 'Tantify: http://127.0.0.1:4173');
fs.writeFileSync('server.mjs', server);
console.log('✓ server.mjs updated');

// ── 5. Update package.json ──
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.name = 'tantify';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('✓ package.json updated');

console.log('\nAll updates applied successfully!');
