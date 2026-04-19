import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', 'src', 'data');
mkdirSync(outDir, { recursive: true });

let lastUpdatedISO;
let commit;
try {
  lastUpdatedISO = execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim();
  commit = execSync('git log -1 --format=%h', { encoding: 'utf8' }).trim();
} catch {
  lastUpdatedISO = new Date().toISOString();
  commit = 'nogit';
}

if (!lastUpdatedISO) lastUpdatedISO = new Date().toISOString();
if (!commit) commit = 'nogit';

const meta = {
  lastUpdated: lastUpdatedISO.slice(0, 10),
  lastUpdatedISO,
  commit,
};

writeFileSync(resolve(outDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
console.log(`meta stamped: ${meta.lastUpdated} / ${meta.commit}`);
