import { marked } from 'marked';

const guideFiles = import.meta.glob('/content/guide/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const techniqueFiles = import.meta.glob('/content/techniques/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(3, end).replace(/^\n/, '');
  const rest = raw.slice(end + 4).replace(/^\n/, '');
  const data = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawVal] = m;
    const value = rawVal.trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, body: rest };
}

function toRecord(path, raw) {
  const { data, body } = parseFrontmatter(raw);
  const slug = path.replace(/^\/content\//, '').replace(/\.md$/, '');
  return {
    slug,
    path,
    title: data.title || slug,
    tier: data.tier || 'basics',
    tags: Array.isArray(data.tags) ? data.tags : [],
    html: marked.parse(body),
    body,
  };
}

const tierOrder = { basics: 0, intermediate: 1, advanced: 2, frontier: 3, source: 4 };

export const guide = Object.entries(guideFiles)
  .map(([path, raw]) => toRecord(path, raw))
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const techniques = Object.entries(techniqueFiles)
  .map(([path, raw]) => toRecord(path, raw))
  .sort((a, b) => {
    const ta = tierOrder[a.tier] ?? 9;
    const tb = tierOrder[b.tier] ?? 9;
    if (ta !== tb) return ta - tb;
    return a.title.localeCompare(b.title);
  });
