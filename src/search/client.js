import FlexSearch from 'flexsearch';
import docs from '../data/search.json';

const index = new FlexSearch.Document({
  tokenize: 'forward',
  document: {
    id: 'slug',
    index: [
      { field: 'title', tokenize: 'forward' },
      { field: 'tags', tokenize: 'forward' },
      { field: 'body', tokenize: 'forward' },
    ],
    store: ['title', 'tier', 'section', 'slug', 'url'],
  },
});

for (const d of docs) {
  index.add(d);
}

export default function search(q) {
  const raw = index.search(q, { enrich: true, limit: 24 });
  const bySlug = new Map();
  for (const fieldRes of raw) {
    for (const hit of fieldRes.result) {
      if (!bySlug.has(hit.id)) {
        bySlug.set(hit.id, { slug: hit.id, ...hit.doc });
      }
    }
  }
  return [...bySlug.values()];
}
