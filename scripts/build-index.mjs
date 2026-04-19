import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = resolve(__dirname, '..', 'content');
const outDir = resolve(__dirname, '..', 'src', 'data');
mkdirSync(outDir, { recursive: true });

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const docs = [];
for (const file of walk(contentDir)) {
  const raw = readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const rel = file.slice(contentDir.length + 1).replace(/\\/g, '/');
  const slug = rel.replace(/\.md$/, '');
  docs.push({
    slug,
    title: data.title || slug,
    tier: data.tier || 'basics',
    tags: Array.isArray(data.tags) ? data.tags : [],
    section: rel.split('/')[0],
    body: content.trim(),
  });
}

const sourcesPath = resolve(contentDir, 'sources.json');
if (existsSync(sourcesPath)) {
  const sources = JSON.parse(readFileSync(sourcesPath, 'utf8'));
  for (const s of sources) {
    docs.push({
      slug: `sources/${encodeURIComponent(s.title).slice(0, 40)}`,
      title: s.title,
      tier: 'source',
      tags: [s.type, ...(s.authors ? [s.authors] : [])],
      section: 'sources',
      body: `${s.title}\n${s.authors || ''}\n${s.type}\n${s.url}`,
      url: s.url,
    });
  }
}

writeFileSync(resolve(outDir, 'search.json'), JSON.stringify(docs, null, 2) + '\n');
console.log(`indexed ${docs.length} documents`);
