// test-screens.mjs — headless smoke test + screenshot of every route
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE  = 'http://localhost:5173';
const DIR   = './screenshots';
const WIDTH = 1280;

mkdirSync(DIR, { recursive: true });

const ROUTES = [
  { path: '/login',          name: 'Login',           height: 800  },
  { path: '/register',       name: 'Register',        height: 900  },
  { path: '/forgot-password',name: 'ForgotPassword',  height: 800  },
  { path: '/dashboard',      name: 'Dashboard',       height: 1400 },
  { path: '/subscriptions',  name: 'Subscriptions',   height: 1800 },
  { path: '/account',        name: 'Account',         height: 1200 },
  { path: '/cli-auth',       name: 'CliAuth',         height: 900  },
];

const browser = await chromium.launch();
let allPassed = true;

for (const { path, name, height } of ROUTES) {
  const errors = [];
  const page = await browser.newPage();
  page.on('pageerror', e  => errors.push(`[runtime] ${e.message}`));
  page.on('console',   m  => { if (m.type() === 'error') errors.push(`[console] ${m.text()}`); });

  await page.setViewportSize({ width: WIDTH, height });
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 15000 });

  const rootHtml = await page.locator('#root').innerHTML();
  const blank    = rootHtml.trim().length < 20;
  const hasErr   = errors.length > 0;

  const file = `${DIR}/${name}.png`;
  await page.screenshot({ path: file, fullPage: true });

  const mark = blank ? 'BLANK' : hasErr ? 'ERRORS' : 'OK';
  console.log(`${mark}  ${name}  -> ${file}`);
  if (hasErr) errors.forEach(e => console.log(`       ${e.slice(0, 200)}`));
  if (blank || hasErr) allPassed = false;

  await page.close();
}

await browser.close();
process.exit(allPassed ? 0 : 1);
