import { guide, techniques } from './loaders.js';

export function getGuide() {
  return guide;
}

export function getTechniques() {
  return techniques;
}

export function findTechnique(slug) {
  return techniques.find((t) => t.slug === slug);
}
